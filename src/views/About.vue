<template>
  <div class="about p-4">
    <div class="p-4 w-full bg-white rounded shadow-sm">
      <h1>This is an about page</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data: () => ({
    book: {},
  }),
  created() {
    fetch('/books/PANTONE SkinTone™ Guide.json').then((response) => response.json())
      .then((book) => {
        console.log(book);
        this.book = book;
      });
  },
};
</script>
