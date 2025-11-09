const tf = require('@tensorflow/tfjs');
const tfconv = require('@tensorflow/tfjs-converter');

async function convertModel() {
  try {
    // Load the model using tfjs-converter
    const model = await tfconv.loadGraphModel('file://trained_model.h5');
    
    // Save the model in TensorFlow.js format
    await model.save('file://public/trained_model');
    
    console.log('Model conversion successful!');
  } catch (error) {
    console.error('Error converting model:', error);
  }
}

convertModel(); 