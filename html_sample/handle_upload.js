function saveData(data, filename) {
  const a = document.createElement('a');
  const file = new Blob([data], {type: 'octet/stream'});
  a.href= URL.createObjectURL(file);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function arrayToWasmPtr(array) {
  var ptr = Module._malloc(array.length);
  Module.HEAP8.set(array, ptr);
  return ptr;
}

function wasmPtrToArray(ptr, length) {
  var array = new Int8Array(length);
  array.set(Module.HEAP8.subarray(ptr, ptr + length));
  return array;
}

function compressData(data) {
  compressDataFunction = Module.cwrap('compress_data', 'number', ['number', 'number', 'number']);

  var compressedDataPtr = Module._malloc(data.length);
  var compressedDataSize = compressDataFunction(arrayToWasmPtr(data),
      data.length, compressedDataPtr);
  var compressedData = wasmPtrToArray(compressedDataPtr, compressedDataSize);

  console.log("Action: COMPRESS", "Data Size:", data.length, "Result Size:", compressedDataSize);

  return compressedData;
}

function decompressData(data) {
  decompressDataFunction = Module.cwrap('decompress_data', 'number', ['number', 'number', 'number', 'number']);

  var decompressedDataPtr = Module._malloc(data.length * 3);
  var decompressedDataSize = decompressDataFunction(arrayToWasmPtr(data),
      data.length, decompressedDataPtr, data.length * 3);
  var decompressedData = wasmPtrToArray(decompressedDataPtr, decompressedDataSize);

  console.log("Action: DECOMPRESS", "Data Size:", data.length, "Result Size:", decompressedDataSize);

  return decompressedData;
}


function processFile(file, processor, output_name) {
  console.log("Process file:", file.name);
  var fileReader = new FileReader();
  fileReader.onload = function () {
    var rawData = new Uint8Array(fileReader.result);
    saveData(processor(rawData), output_name);
  };
  fileReader.readAsArrayBuffer(file);
}

const url = 'process.php';

document.getElementById('compress_button').addEventListener(
  'click',
  e => {
    e.preventDefault();

    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      processFile(file, compressData, file.name + '.lz4');
    }
  }
)

document.getElementById('decompress_button').addEventListener(
  'click',
  e => {
    e.preventDefault();

    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      processFile(file, decompressData, file.name.substring(0, file.name.indexOf('.lz4')));
    }
  }
)
