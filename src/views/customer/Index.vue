<template>
  <div class="dashboard">
    <v-subheader>
      <v-icon class="mr-2">mdi-home</v-icon>
      <h3>Danh sách Khách hàng</h3>
      <v-spacer></v-spacer>
      <v-btn color="primary" small dark elevation="3" fab @click="dialogAdd = true">
        <v-icon color="white">mdi-account-plus</v-icon>
      </v-btn>
    </v-subheader>
    <v-row class="mt-0">
      <v-col>
        <v-card>
          <v-data-table
            :search="search"
            :custom-filter="filterOnlyCapsText"
            :headers="headers"
            :items="customers"
            :items-per-page="5"
          >
            <template v-slot:top>
              <v-text-field v-model="search" label="Search " class="mx-4"></v-text-field>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.id }}</td>
                <td><img :src="'http://localhost:5136/images/guest/' + item.acctualFileUrl" style="width: 100px" /></td>
                <td>{{ item.username }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.creationTime }}</td>
                <td>
                  <div class="d-flex justify-end align-center">
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      class="mr-3"
                      x-small
                      color="blue-grey"
                      @click="
                        dialogEdit = true
                        currentItem = item
                      "
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      dark
                      x-small
                      c
                      color="red"
                      @click="
                        dialogDelete = true
                        customerId = item.id
                      "
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="450px" class="dialog-delete">
      <v-card>
        <v-alert prominent type="error">
          <v-row align="center">
            <v-col class="text-center text-h5" cols="11"> Bạn có đồng ý xóa không? </v-col>
          </v-row>
          <v-row align="center">
            <v-spacer></v-spacer>
            <v-col cols="5">
              <v-btn @click="deleteCustomer" text> Đồng ý </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn @click="dialogDelete = false" text> Hủy bỏ </v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-card>
    </v-dialog>
    <add :dialogAdd="dialogAdd" @close="dialogAdd = false" @updateData="getListCustomer" />
    <edit
      :dialogEdit="dialogEdit"
      @close="dialogEdit = false"
      :currentItem="currentItem"
      @updateData="getListCustomer"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Add from './Add.vue'
import Edit from './Edit.vue'
export default {
  components: { Add, Edit },
  name: 'Customer',
  data() {
    return {
      search: '',
      headers: [
        { text: 'STT', value: 'id' },
        { text: 'Ảnh đại diện', value: 'acctualFileUrl' },
        { text: 'Họ tên', value: 'username' },
        { text: 'Số điện thoại', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'Ngày đăng ký', value: 'creationTime' },
        { text: 'Chức năng', value: 'actions', align: 'right' },
      ],
      customers: [],
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      currentItem: null,
      customerId: null,
    }
  },
  methods: {
    getListCustomer() {
      axios
        .get('http://localhost:5136/resort-manager/customer/get-all')
        .then((res) => {
          this.customers = res.data
        })
        .catch((eror) => {
          console.log(eror)
        })
    },
    deleteCustomer() {
      axios.delete('http://localhost:5136/resort-manager/service/delete/' + this.customerId).then((res) => {
        if (res) {
          var newArr = this.customers.filter((x) => x.customerId != this.customerId)
          this.customers = newArr
          this.dialogDelete = false
        }
      })
      this.$emit('close')
      location.reload();
    },
  },
  created() {
    this.getListCustomer()
  },
}
</script>

<style>
</style>