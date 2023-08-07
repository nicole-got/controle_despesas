<template>
  <div class="row" style="height: 90vh">
    <div 
      v-bind:class="{'justify-center': true}"
      class="col-12 col-md-12 flex content-center"
    >
      <q-card v-bind:style="$q.screen.lt.sm ? {'width': '80%'} : {'width': '50%'}">
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Login</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form 
            class="q-gutter-md"
            @submit="onSubmit"
          >
            <q-input label="Email" v-model="form.email" />
            <q-input label="Senha" type="password" v-model="form.password"/>
            <div class="col-12 q-gutter-md">
              <q-btn class="full-width" color="primary" label="Login" type="submit" rounded></q-btn>
              <q-btn class="full-width" color="white" label="Cadastrar" text-color="primary" :to="{name: 'CadastroUsuario'}" rounded></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Login',
  setup(){
    const $q = useQuasar()
    const router = useRouter()
    const form = ref({
      email: '',
      password: ''
    })

    const onSubmit = async () => {
      try{
        const response =  await api.post('login', form.value)
        localStorage.token = response.data.access_token
        router.push({name: 'home'})
      }catch(e){
        $q.notify({ 
          message: 'Login ou senha incorretos.', 
          color: 'negative', 
          position: 'top-right',
          actions: [ { icon: 'close', color: 'white', round: true } ] 
        })
        console.log('ERROR: ', e.response.status)
      }
    }

    return {
      form, onSubmit
    }
  }
})
</script>