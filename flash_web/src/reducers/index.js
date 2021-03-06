import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import homeReducer from './homeReducer';
import loadingFormReducer from './loadingFormReducer';
import formFileFieldReducer from './formFileFieldReducer';
import classificationReducer from './classificationReducer';
import sentimentAnalysisReducer from './sentimentAnalysisReducer';
import serverConfigReducer from './serverConfigReducer';
import inferenceReducer from './inferenceReducer';

export default combineReducers({
  form: formReducer,
  isHome: homeReducer,
  loadingForm: loadingFormReducer,
  formFileField: formFileFieldReducer,
  classification: classificationReducer,
  sentimentAnalysis: sentimentAnalysisReducer,
  serverConfig: serverConfigReducer,
  inference: inferenceReducer,
});
