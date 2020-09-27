#include "lz4.h"

extern "C" {

uint32_t compress_data(const char* data, uint32_t data_size, char* result) {
  int result_size = LZ4_compress_default(data, result, data_size, data_size);
  return result_size;
}

}
