/* Collection of services for managing the client side */

(function() {
  'use strict';

  var services = angular.module('tgClientServices', ['ngRoute']);

  services.factory('selections', function() {
      var selections = {
        dataset: '',
        analysis: '',
        topic: '',
        document: ''
      };

      function getDatasetName() {
        return selections.dataset;
      }

      function getAnalysisName() {
        return selections.analysis;
      }

      function getTopicName() {
        return selections.topic;
      }

      function getDocumentName() {
        return selections.document;
      }

      function isDatasetSelected(dataset) {
        return selections.dataset === dataset? true: false;
      }

      function isAnalysisSelected(dataset, analysis) {
        return selections.dataset === dataset && selections.analysis === analysis? true: false;
      }

      function selectDataset(dataset) {
        if(selections.dataset !== dataset) {
          selections.analysis = '';
        }
        selections.dataset = dataset;
      }

      function selectAnalysis(analysis) {
        selections.analysis = analysis;
      }

      selections.getDatasetName = getDatasetName;
      selections.getAnalysisName = getAnalysisName;
      selections.getTopicName = getTopicName;
      selections.getDocumentName = getDocumentName;
      selections.isDatasetSelected = isDatasetSelected;
      selections.isAnalysisSelected = isAnalysisSelected;
      selections.selectDataset = selectDataset;
      selections.selectAnalysis = selectAnalysis;
      return selections;
    });

  services.factory('authentication', function() {
      var auth = {};
      auth.signedIn = false;
      return auth;
    });
})();
