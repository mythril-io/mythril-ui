<template>
  <div>
    <form @submit.prevent="patch">
      <div>
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h3>

        </div>
        <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="about" class="block text-sm font-medium leading-5 text-gray-700">
                About
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <textarea id="about" v-model="details.about_me" rows="3" class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
            </div>
            <div class="sm:col-span-3">
              <label for="location" class="block text-sm font-medium leading-5 text-gray-700">
                Location
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input id="location" v-model="details.location" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="birthday" class="block text-sm font-medium leading-5 text-gray-700">
                Birthday
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <flat-pickr name="birthday" v-model="details.birthday" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" :config='flatPickrConfig' placeholder="Select Date"></flat-pickr>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="gender" class="block text-sm font-medium leading-5 text-gray-700">
                Gender
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <multiselect
                  v-model="details.gender"
                  :options="genders"
                  placeholder="Select a Gender"
                  id="gender"
                >
                </multiselect>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="timezone" class="block text-sm font-medium leading-5 text-gray-700">
                Timezone
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <multiselect
                  v-model="details.timezone"
                  :options="timezones"
                  placeholder="Select a Timezone"
                  id="timezone"
                >
                </multiselect>
              </div>
            </div>
          </div>
      </div>
      <div class="mt-8 border-t border-gray-200 pt-5">
        <div class="flex justify-end">
          <span class="rounded-md shadow-sm">
            <button type="submit" class="button button-primary">
              Save
            </button>
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
var moment = require('moment-timezone');
import { userService } from '@/services';

export default {
  name: 'SettingsDetails',
  components: {
    flatPickr
  },
  data () {
    return {
      flatPickrConfig: { dateFormat: "Y-m-d" },
      genders: ['Female', 'Male', 'Undisclosed'],
      timezones: moment.tz.names(),
      details: {
        about_me: '',
        location: '',
        gender: null,
        timezone: null,
        birthday: null,
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.authentication.user;
    }
  },
  methods: {
    patch () {
      const { dispatch } = this.$store;
      userService.patchDetails(this.details.about_me, this.details.location, this.details.gender, this.details.timezone, this.details.birthday).then(
        response => {
          dispatch('authentication/updateUser', response.data );
          dispatch('alert/success', 'Profile updated');
        },
        error => {
          dispatch('alert/error', error);
        }
      );
    },
  },
  created () {
    if (this.user) {
      this.details.about_me = this.user.about_me
      this.details.location = this.user.location
      this.details.gender = this.user.gender
      this.details.timezone = this.user.timezone
      this.details.birthday = this.user.birthday
    }
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
