import React from 'react';
import { connect } from 'react-redux';

import {
  clearTrainToken,
  setTrainConfig,
  classifyTrain,
  classifyDataClear,
  clearTrainConfig,
} from '../../../actions';
import history from '../../../history';
import ClassificationCreate from './ClassificationCreate';
import ClassificationSubmitModal from './ClassificationSubmitModal';

class Classification extends React.Component {
  constructor(props) {
    super(props);

    this.taskName = 'classification';
    this.formName = `${this.taskName}ConfigForm`;

    this.configOptions = {
      modelTypes: ['MobileNet v2', 'ResNet34'],
      modelFieldTitle: 'Model',
      numClassesLimit: { min: 2, max: 10 },
      numImagesLimit: { min: 10, max: 100 },
      sizeLimit: 20000000, // In bytes (20 MB)
    };

    this.currentConfig = {
      modelType: 'MobileNet v2',
      dataSplit: '70 : 30',
      optimizer: 'sgd',
      criterion: 'crossEntropy',
      learningRate: 0.01,
    };
  }

  onSubmit = values => {
    // Send values to server
    this.props.classifyTrain({
      formName: this.formName,
      trainConfig: values,
    });
  };

  onModalDismiss = () => {
    this.props.classifyDataClear();
    this.props.clearTrainToken();
    history.push('/inference');
  };

  componentDidMount() {
    this.props.setTrainConfig({
      taskName: this.taskName,
      config: {
        ...this.configOptions,
        ...this.props.trainConfigOptions,
        currentConfig: this.currentConfig,
      },
    });
  }

  componentWillUnmount() {
    this.props.clearTrainConfig(this.taskName);
  }

  renderModal() {
    return (
      <React.Fragment>
        {this.props.token ? (
          <ClassificationSubmitModal onDismiss={this.onModalDismiss} />
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mt-5">
          <div className="col-6 mx-auto">
            <ClassificationCreate
              taskName={this.taskName}
              formName={this.formName}
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ serverConfig: { token } }) => {
  return { token };
};

export default connect(mapStateToProps, {
  clearTrainToken,
  setTrainConfig,
  classifyTrain,
  classifyDataClear,
  clearTrainConfig,
})(Classification);
