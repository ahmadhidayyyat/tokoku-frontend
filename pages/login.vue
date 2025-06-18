<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <div class="flex-grow flex items-center justify-center">
      <div
        class="container flex w-full max-w-6xl m-4 bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <!-- Kiri: Formulir Login -->
        <div class="w-full lg:w-1/2 p-8 md:p-14">
          <div class="flex items-center mb-12">
            <img
              src="/image/logo-TokoKu.png"
              alt="Logo TokoKu"
              class="w-20 h-auto"
            />
          </div>
          <h2 class="text-3xl font-semibold text-gray-900">
            Selamat Datang Kembali
          </h2>
          <p class="mt-2 text-gray-600">
            Masukkan username dan kata sandi Anda untuk mulai menggunakan sistem
            kasir.
          </p>

          <form class="mt-8 space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="email"
                class="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: Kasir1"
              />
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                class="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              class="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Masuk
            </button>
          </form>
        </div>

        <!-- Kanan: Visual -->
        <div
          class="hidden lg:flex flex-col items-center justify-center w-1/2 p-8 text-white bg-blue-700 rounded-r-2xl"
        >
          <div class="text-center">
            <h2 class="text-4xl font-bold">
              Kelola transaksi harian toko Anda dengan lebih mudah.
            </h2>
            <p class="mt-4">Masuk untuk mengakses dashboard kasir.</p>
          </div>
          <div class="mt-10">
            <img
              src="/image/login-view.png"
              alt="Tampilan Kasir"
              class="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
