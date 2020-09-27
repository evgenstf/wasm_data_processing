em++ main.cpp -O2 lz4.c -o wasm_compressor.js -s EXPORTED_FUNCTIONS='["_compress_data","_decompress_data"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s FORCE_FILESYSTEM=1 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1

