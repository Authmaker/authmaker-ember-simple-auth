/* eslint-disable prettier/prettier */
'use strict';

const recast = require('recast');
const chalk = require('chalk');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const EmberRouterGenerator = require('ember-router-generator');

module.exports = {
  description: 'Default blueprint for authmaker-ember-simple-auth',

  normalizeEntityName() {
    // no-op
  },

  fileMapTokens: function() {
    let isAddon = this.project.isEmberCLIAddon();
    return {
      __base__() {
        if(isAddon) {
          return join('tests', 'dummy');
        }
        return '';
      }
    }
  },

  afterInstall: function(options) {
    updateRouter.call(this, 'add', options);

    updateEnvironment.call(this);
  },

  afterUninstall: function(options) {
    updateRouter.call(this, 'remove', options);
  },
};

function updateRouter(action, options) {
  let routeName = 'login';

  let actionColorMap = {
    add: 'green',
    remove: 'red',
  };
  let color = actionColorMap[action] || 'gray';

  writeRoute(action, routeName, options);

  this.ui.writeLine('updating router');
  this._writeStatusToUI(chalk[color], action + ' route', routeName);

}

function findRouter(options) {
  let routerPathParts = [options.project.root];

  if (options.project.isEmberCLIAddon()) {
    routerPathParts = routerPathParts.concat(['tests', 'dummy', 'app', 'router.js']);
  } else {
    routerPathParts = routerPathParts.concat(['app', 'router.js']);
  }

  return routerPathParts;
}

function writeRoute(action, name, options) {
  let routerPath = join.apply(null, findRouter(options));
  let source = readFileSync(routerPath, 'utf-8');

  let routes = new EmberRouterGenerator(source);
  let newRoutes = routes[action](name, options);

  writeFileSync(routerPath, newRoutes.code());
}

function updateEnvironment() {
  const builders = recast.types.builders;

  let configFile = './config/environment.js'

  if(this.project.isEmberCLIAddon()) {
    configFile = './tests/dummy/config/environment.js';
  }

  const config = readFileSync(configFile);
  const configAst = recast.parse(config);

  recast.visit(configAst, {
    visitIfStatement: function (path) {
      var node = path.node;

      if(node.test.right.value === 'development' || node.test.right.value === 'production') {
        let authmakerConfig = node.consequent.body.find((statement) => {
          if(statement.type !== 'ExpressionStatement') { return false; }
          if(statement.expression.type !== 'AssignmentExpression') { return false; }

          if (statement.expression.left.object.name === 'ENV' && statement.expression.left.property.name === 'authmaker') {
            return true;
          }
        });

        if(!authmakerConfig) {
          authmakerConfig = builders.expressionStatement(builders.assignmentExpression(
            '=',
            builders.memberExpression(builders.identifier('ENV'), builders.identifier('authmaker')),
            builders.objectExpression([
              builders.property('init', builders.identifier('domainUrl'), builders.literal('REPLACE_ME')),
              builders.property('init', builders.identifier('redirectUri'), builders.literal('REPLACE_ME')),
              builders.property('init', builders.identifier('clientId'), builders.literal('REPLACE_ME')),
            ])
          ));

          node.consequent.body.push(authmakerConfig);
        }
      }

      this.traverse(path);
    }
  });

  writeFileSync(configFile, recast.print(configAst, { tabWidth: 2, quote: 'single' }).code);
}
