<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5">Despesas</span>
        <q-space />
        <q-btn color="primary" label="Nova Despesa" :to="{name: 'formDespesa'}" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td   :props="props" class="q-gutter-sm">
          <q-btn 
            icon="edit" 
            color="warning" 
            size="sm" 
            dense 
            @click="updateDespesa(props.row.id)"
          />
          <q-btn 
            icon="delete" 
            color="negative" 
            size="sm" 
            dense 
            @click="deleteDespesa(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const posts = ref([])
    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    }
    const columns = [
      { name: 'id',         align: 'center',  label: 'ID',        field:'id',         sortable: true },
      { name: 'usuario',    align: 'center',  label: 'Usuário',   field:'usuario',  sortable: true },
      { name: 'descricao',  align: 'center',  label: 'Descrição', field:'descricao',  sortable: true },
      { name: 'data',       align: 'center',  label: 'Data',      field:'data',       sortable: true },
      { name: 'valor',      align: 'center',  label: 'Valor',     field:'valor',      sortable: true },
      { name: 'actions',    align: 'center',  label: 'Ações',     field:'actions' },
    ]

    onMounted(() =>{
      getPosts()
    })

    const getPosts = async () => {
      try{
        const {data} = await api.get('despesa',config)
        // console.log(data)
        posts.value = data.data
      }catch(e){
          if(e.response.status == 401){
            router.push({name: 'Login'})
          }
          console.log('ERROR: ', e.response)
      }

    }

    const deleteDespesa = async (id)=>{
      try{
        await api.delete('despesa/'+id,config)
        $q.notify({ 
          message: 'Despesa apagada com sucesso!', 
          color: 'positive', 
          position: 'top-right',
          actions: [ { icon: 'close', color: 'white', round: true } ] 
        })
        await getPosts()
      } catch(e){
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

    const updateDespesa = (id)=>{
      router.push({name: 'formDespesa', params: {id}})
    }

    return {
      posts, columns, deleteDespesa, updateDespesa
    }
  }
})
</script>
