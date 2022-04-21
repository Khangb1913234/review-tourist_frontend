<template>
    <Form
        @submit="$emit('submit:collaborator', collaboratorLocal)"
        :validation-schema="collaboratorFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="collaboratorLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="collaboratorLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">SDT</label>
            <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="collaboratorLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="website">Website</label>
            <Field
                name="website"
                type="text"
                class="form-control"
                v-model="collaboratorLocal.website"
            />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="collaboratorLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="$emit('delete:collaborator', collaboratorLocal.id)"
            >
                Xóa
            </button>
        </div>
        <div>
            <router-link to="/collaborator">
                <button class="btn btn-primary">Trở lại</button>
            </router-link>
            
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
    emits: ["submit:collaborator", "delete:collaborator"],
    props: {
        collaborator: { type: Object, required: true }
    },
    data() {
        const collaboratorFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(100, "Tên có nhiều nhất 100 ký tự."),
            address: yup
                .string()
                .required("Địa chỉ phải có giá trị.")
                .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
                .max(100, "Địa chỉ có nhiều nhất 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05|02)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            website: yup
                .string()
                .required("Link phải có giá trị.")
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //  để liên kết với các input trên form
            collaboratorLocal: this.collaborator,
            collaboratorFormSchema,
        };
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>