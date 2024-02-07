<script setup lang="ts">
import { useDropzone } from "vue3-dropzone";
import { importCandidates } from "@/services/import"
import { useToast } from "vue-toastification";
const toast = useToast();

async function onDrop(acceptFiles: any) {
    if (acceptFiles.length > 0) {
        const file = acceptFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        await importCandidates(formData);
        toast.success("Data uploaded ... 🚀 ")
    }
}

const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop });
</script>

<template>
    <div class="drop-zone-container">
        <div v-bind="getRootProps()" class="drop-zone">
            <input v-bind="getInputProps()" />
            <p v-if="isDragActive" >Drop the files here ...</p>
            <p v-else>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <button @click="open">open</button>
    </div>
</template>
  
<style lang="scss">

.drop-zone-container {
    width: 50%;
    margin: 10% auto;
    height: 30%;
}
.drop-zone {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
    background: $accent-background-color;
    display: flex;
    border: 1px dashed $secondary-border-color;
    border-radius: 5px;
}
</style>
  