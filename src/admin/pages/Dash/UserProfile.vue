<template>
  <div class="bg-white shadow rounded-2xl p-6">
    <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
    <div class="grid grid-cols-2 gap-4">
      <input class="border rounded p-2" placeholder="First Name" />
      <input class="border rounded p-2" placeholder="Last Name" />
      <input class="border rounded p-2 col-span-2" placeholder="Email" />
      <textarea class="border rounded p-2 col-span-2" placeholder="About me"></textarea>
    </div>
    <button class="mt-4 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md">
      Update Profile
    </button>
  </div>
</template>
