em++ main.cpp lz4.c -o wasm_compressor.js -s EXPORTED_FUNCTIONS='["_compress_data","_decompress_data"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -O2
