<template>
    <Form
        @submit="$emit('submit:destination', destinationLocal)"
        :validation-schema="destinationFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="destinationLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="location">Location</label>
            <Field
                name="location"
                type="location"
                class="form-control"
                v-model="destinationLocal.location"
            />
            <ErrorMessage name="location" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Mô tả</label>
            <Field
                name="description"
                type="text"
                class="form-control"
                v-model="destinationLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Ảnh</label>
            <Field
                name="image"
                type="tel"
                class="form-control"
                v-model="destinationLocal.image"
            />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="destinationLocal.trend"
            />
            <label for="favorite" class="form-check-label">
                <strong>Địa điểm nổi bật</strong>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="destinationLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="$emit('delete:destination', destinationLocal.id)"
            >
                Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:destination", "delete:destination"],
    props: {
        destination: { type: Object, required: true }
    },
    data() {
        const destinationFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(100, "Tên có nhiều nhất 100 ký tự."),
            location: yup
                .string()
                .required("Vị trí phải có giá trị.")
                .min(2, "Vị trí phải ít nhất 2 ký tự.")
                .max(100, "Vị trí có nhiều nhất 100 ký tự."),
            description: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .min(2, "Mô tả phải ít nhất 20 ký tự.")
                .max(100, "Mô tả có nhiều nhất 500 ký tự."),
            image: yup
                .string()
                .required("Ảnh phải có giá trị(đường link ảnh).")
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //  để liên kết với các input trên form
            destinationLocal: this.destination,
            destinationFormSchema,
        };
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>