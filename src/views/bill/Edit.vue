<template>
  <v-dialog v-model="dialog" max-width="640px">
    <v-card flat title>
      <v-card-title class="primary headline">
        <span style="color: white">Cập nhật hợp đồng</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.billNumber" label="Mã hóa đơn"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-file-input v-model="data.file" truncate-length="15" label="Chọn ảnh"></v-file-input>
              </v-col>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="data.contractNumber" label="Mã hợp đồng"></v-text-field>
                </v-col>
              </v-row>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.rentalPrice" label="Tiền thuê phòng"></v-text-field>
              </v-col>
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
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @close="dialogEdit = false"> Hủy </v-btn>
        <v-btn color="primary" class="mr-4" dark @click="updateCategory"> Lưu </v-btn>
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
        contractNumber: '',
        file: '',
        roomNumber: '',
        username: '',
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
      this.data.billNumber = this.currentItem.billNumber
      this.data.file = this.currentItem.file
      this.data.contractNumber = this.currentItem.contractNumber
      this.data.rentalPrice = this.currentItem.rentalPrice
      this.data.status = this.currentItem.status
      this.data.description = this.currentItem.description
      this.data.id = this.currentItem.id
    },
  },
  methods: {
    updateCategory() {
      axios.post('http://localhost:5136/resort-manager/bill/update', this.data).then((res) => {
        this.$emit('updateData')
        this.$emit('close')
      })
    },
  },
}
</script>

<style>
</style>