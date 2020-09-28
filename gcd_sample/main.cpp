#include <algorithm>


extern "C" {

int calculate_gcd(int a, int b) {
  while (a != 0 && b != 0) {
    a %= b;
    std::swap(a, b);
  }
  auto result = a + b;
  return result;
}

}
