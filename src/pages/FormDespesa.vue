<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row q-col-gutter-md"
    >
      <q-select
        filled
        class="col-md-6"
        v-model="form.idUsuario"
        :options="usuarios"
        label="Responsável"
        emit-value
        map-options
        :rules="[val => val || 'Campo obrigatório']"
      />

      <q-input
        outlined
        class="col-md-6"
        filled
        v-model="form.descricao"
        label="Descrição"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']"
      ></q-input>

      <div class="col-md-6" >
        <q-input label="Data" filled v-model="form.data" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon  name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date mask="YYYY-MM-DD" v-model="form.data">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <q-input
        outlined
        class="col-md-6"
        filled
        v-model="form.valor"
        label="Valor"
        lazy-rules
        :rules="[val => val && val > 0 || 'Campo obrigatório']"
      ></q-input>

      <div class="col-12 q-gutter-md">
        <q-btn 
          label="Salvar"   
          color="primary" 
          class="float-right" 
          icon="save" 
          type="submit"
        />
        <q-btn 
          label="Cancelar" 
          color="white" 
          class="float-right" 
          icon="save" 
          text-color="primary" 
          :to="{name: 'home'}"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script>

import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name:'FormDespesa',
  setup(){
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    }
    const form = ref({
      descricao: '',
      idUsuario: '',
      data: '',
      valor: '',
      id: 0
    })
    const usuarios = ref([])

    onMounted(async () =>{
      console.log(route.params.id)
      if(route.params.id){
        try{
          const response = await api.get('despesa/'+route.params.id, config)
          console.log(response)
          form.value = response.data
        }catch(e){
          if(e.response.status == 401){
            router.push({name: 'Login'})
          }else if(e.response.data.message){
            $q.notify({ 
              message: e.response.data.message, 
              color: 'negative', 
              position: 'top-right',
              actions: [ { icon: 'close', color: 'white', round: true } ] 
            })
          }
          console.log('ERROR: ', e.response)
        }
      }

      try{
        const responseUsuarios = await api.get('usuario', config)
        usuarios.value = responseUsuarios.data.data.map((e) =>{
          return {label: e.nome, value: e.id}
        })
      }catch(e){
          if(e.response.status == 401){
            router.push({name: 'Login'})
          }
          console.log('ERROR: ', e.response)
      }

    })

    const onSubmit = async () => {
      try{
        if(route.params.id > 0){
          await api.put('despesa/'+route.params.id, form.value, config)
        }else{
          await api.post('despesa', form.value, config)
        }
        $q.notify({ 
          message: 'Despesa salva com sucesso!', 
          color: 'positive', 
          position: 'top-right',
          actions: [ { icon: 'close', color: 'white', round: true } ] 
        })
        router.push({name: 'home'})
      }catch(e){
          if(e.response.status == 401){
            router.push({name: 'Login'})
          }
          console.log('ERROR: ', e.response)
      }
    }

    return {
      form, onSubmit, usuarios
    }
  }
})
</script>