<script setup>
import bookService from '@/services/book.service';
import { onMounted, ref } from 'vue';
import Accordion from './Accordion.vue';
import FilterItem from './FilterItem.vue';

const author = ref([])
const publisher = ref([])
const category = ref([])

const fetchData = async () => {
    try {
        let temp;
        temp = await bookService.getAuthor({ sort: "fullname asc"});
        author.value = temp.map((item) => ({
            _id: item._id,
            label: item.fullname
        }))

        temp = await bookService.getCategory({ sort: "title asc"});
        category.value = temp.map((item) => ({
            _id: item._id,
            label: item.title
        }))

        temp = await bookService.getPublisher({ sort: "name asc" });
        publisher.value = temp.map((item) => ({
            _id: item._id,
            label: item.name
        }))
    } catch(error){
        console.log(error)
    }
}

onMounted(() => {
    fetchData();
})

</script>
<template>
    <Accordion>
        <FilterItem id="category" first label="Danh mục" :body="category" expand />
        <FilterItem id="author" label="Tác giả" :body="author" />
        <FilterItem id="publisher" end label="Nhà xuất bản" :body="publisher" />
    </Accordion>
</template>