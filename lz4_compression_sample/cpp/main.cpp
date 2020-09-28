#include "lz4.h"

extern "C" {

uint32_t compress_data(uint32_t* data, uint32_t data_size, uint32_t* result) {
  uint32_t result_size = LZ4_compress((const char *)(data), (char*)(result), data_size);
  return result_size;
}

uint32_t decompress_data(uint32_t* data, uint32_t data_size, uint32_t* result, uint32_t max_output_size) {
  uint32_t result_size = LZ4_uncompress_unknownOutputSize((const char *)(data), (char*)(result), data_size, max_output_size);
  return result_size;
}

}
