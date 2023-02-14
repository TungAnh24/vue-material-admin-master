<template>
  <v-dialog v-model="dialog" max-width="640px">
    <v-card flat title>
      <v-card-title class="primary headline">
        <span style="color: white">Cập nhật dịch vụ</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-text-field v-model="data.id" hidden readonly></v-text-field>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.acctualFileUrl" label="Ảnh đại diện"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.username" readonly label="Họ tên"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.phone" readonly label="Số điện thoại"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.email" readonly label="Email"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.creationTime" readonly label="Ngày đăng ký"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.unit" label="Đơn vị tính"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @close="dialogEdit = false"> Hủy </v-btn>
        <v-btn color="primary" class="mr-4" dark @click="updateCustomer"> Lưu </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Edit',
  data() {
    return {
      data: {
        id: '',
        acctualFileUrl: '',
        username: '',
        phone: '',
        email: '',
        creationTime: '',
      },
    }
  },
  props: ['dialogEdit', 'currentItem'],
  computed: {
    dialog: {
      get() {
        return this.dialogEdit
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      },
    },
  },
  watch: {
    currentItem: function () {
      this.data.id = this.currentItem.id
      this.data.acctualFileUrl = this.currentItem.acctualFileUrl
      this.data.username = this.currentItem.username
      this.data.phone = this.currentItem.phone
      this.data.email = this.currentItem.email
      this.data.creationTime = this.currentItem.creationTime
      this.data.id = this.currentItem.id
    },
  },
  methods: {
    updateCustomer() {
      axios.post('http://localhost:5136/resort-manager/service/update', this.data).then((res) => {
        this.$emit('updateData')
        this.$emit('close')
      })
    },
  },
}
</script>

<style>
</style>