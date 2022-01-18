/* eslint-disable ember/no-classic-classes, prettier/prettier, ember/use-ember-data-rfc-395-imports, ember/no-mixins */
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application'
});
