<template>
  <v-dialog v-model="dialog" max-width="640px">
    <v-card flat title>
      <v-card-title class="primary headline">
        <span style="color: white">Cập nhật khách hàng</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.id" label="STT" readonly></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="data.roomNumber" label="Mã phòng"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-file-input v-model="data.acctualFileUrl" truncate-length="15" label="Chọn ảnh"></v-file-input>
              </v-col>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="data.square" label="Diện tích"></v-text-field>
                </v-col>
              </v-row>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.status" label="Trạng thái"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.description" label="Mô tả"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.price" label="Giá cho thuê"></v-text-field>
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
        roomNumber: '',
        acctualFileUrl: '',
        square: '',
        status: '',
        description: '',
        price: '',
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
      this.data.roomNumber = this.currentItem.roomNumber
      this.data.acctualFileUrl = this.currentItem.acctualFileUrl
      this.data.square = this.currentItem.square
      this.data.status = this.currentItem.status
      this.data.description = this.currentItem.description
      this.data.price = this.currentItem.price
      this.data.id = this.currentItem.id
    },
  },
  methods: {
    updateCustomer() {
      axios.post('http://localhost:5136/resort-manager/room/update', this.data).then((res) => {
        this.$emit('updateData')
        this.$emit('close')
      })
    },
  },
}
</script>

<style>
</style>