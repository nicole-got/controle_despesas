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
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Cadastrar</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form 
            class="q-gutter-md"
            @submit="onSubmit"
          >
            <q-input label="Nome" v-model="form.nome" />
            <q-input label="Email" v-model="form.email" />
            <q-input label="Senha" type="password" v-model="form.senha"/>
            <div class="col-12 q-gutter-md">
              <q-btn class="full-width" color="primary" label="Salvar" type="submit" rounded></q-btn>
              <q-btn class="full-width" color="white" label="Voltar" type="submit" text-color="primary" :to="{name: 'Login'}" rounded></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
    <q-form 
      class="q-gutter-md"
      @submit="onSubmit"
    >
      <q-input
        label="Nome"
        v-model="form.nome"
      >
      </q-input>
      <q-input
        label="Email"
        v-model="form.email"
      >
      </q-input>
      <q-input
        label="Senha"
        type="password"
        v-model="form.senha"
      >
      </q-input>
        <div class="col-12 q-gutter-md">
          <q-btn 
            label="Salvar"   
            color="primary" 
            class="float-right" 
            icon="save" 
            type="submit"
          />
            <q-btn 
            label="Voltar" 
            color="white" 
            class="float-right" 
            icon="save" 
            text-color="primary" 
            :to="{name: 'Login'}"
            />
        </div>
    </q-form>
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
        senha: '',
        nome: ''
      })
  
      const onSubmit = async () => {
        try{
          const response =  await api.post('cadastrar/usuario', form.value)
          $q.notify({ 
            message: 'Usuário cadastrado com sucesso!.', 
            color: 'positive', 
            position: 'top-right',
            actions: [ { icon: 'close', color: 'white', round: true } ] 
          })
          router.push({name: 'Login'})
        }catch(e){
          $q.notify({ 
            message: 'Erro ao cadastrar usuário, tente novamente mais tarde.', 
            color: 'negative', 
            position: 'top-right',
            actions: [ { icon: 'close', color: 'white', round: true } ] 
          })
          console.log('ERROR: ', e.error)
        }
      }
  
      return {
        form, onSubmit
      }
    }
  })
  </script>