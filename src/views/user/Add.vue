<template>
  <v-dialog v-model="dialog" max-width="640px">
    <v-card flat title>
      <v-card-title class="primary headline">
        <span style="color: white">Thêm mới dịch vụ</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.serviceName" label="Tên dịch vụ"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="data.price" label="Giá tiền"></v-text-field>
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
        <v-btn color="green darken-1" class="mr-2" dark @click="dialogAdd = false"> Hủy </v-btn>
        <v-btn color="primary" class="mr-4" dark @click="addCustomer"> Lưu </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Add',
  data() {
    return {
      data: {
        serviceName: '',
        price: '',
        unit: '',
        createdByUser: '',
        updatedByUser: '',
        creationTime: '',
        lastUpdateTime: '',
      },
    }
  },
  props: ['dialogAdd'],
  computed: {
    dialog: {
      get() {
        return this.dialogAdd
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      },
    },
  },
  methods: {
    addCustomer() {
      axios
        .post('http://localhost:5136/resort-manager/service/add-new', this.data)
        .then((res) => {
          console.log(res.data.serviceName)
          this.$emit('updateData')
          this.$emit('close')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
</style>