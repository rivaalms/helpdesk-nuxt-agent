<template>
   <div class="flex justify-center items-center h-screen">
      <u-card class="w-1/3">
         <template #header>
            {{ store.getTitle }}
         </template>

         <u-form 
            :schema="validationSchema"
            :state="state"
            @submit.prevent="submit"
         >

            <u-form-group
               label="Email"
               name="email"
               class="mb-4"
            >
               <u-input
                  v-model="state.email"
               ></u-input>
            </u-form-group>

            <u-form-group
               label="Password"
               name="password"
               class="mb-4"
            >
               <u-input
                  v-model="state.password"
                  :type="showPassword ? 'text' : 'password'"
               ></u-input>
            </u-form-group>
            
            <div class="flex justify-between">
               <u-checkbox
                  v-model="showPassword"
                  label="Show password"
               ></u-checkbox>

               <a
                  href="#"
                  class="text-sm underline text-primary-500 hover:text-primary-600"
               >Forgot password?</a>
            </div>
            
            <div class="flex justify-end mt-6">
               <u-button
                  block
                  type="submit"
                  size="md"
               >
                  Log in
               </u-button>
            </div>
         </u-form>         
      </u-card>
   </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'

const authStore = useAuthStore()
const store = useAppStore()

store.title = 'Login'
useHead({ title: store.getTitle })

definePageMeta({
   middleware: () => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) return navigateTo('/')
   },
   layout: false
})

const state = ref({
   email: undefined,
   password: undefined
})

const showPassword : Ref <boolean> = ref(false)

const validationSchema = yup.object({
   email: yup.string().email('Email is not valid').required('Email is required'),
   password: yup.string().required('Password is required')
})

const loading : Ref <boolean> = ref(false)

const submit = async () => {
   loading.value = true

   await useCsrfCookie()
      .then(async () => {
         await authStore.login(state.value)
            .then(() => {
               useRouter().push('/')
            })
            .catch((error: any) => {
               console.log(error.data?.message)
            })
      })
      .catch((error: any) => {
         console.error('CSRF Protection request failed')
      })
      .finally(() => {
         loading.value = false
      })
}
</script>