<template>
  <div>
    <div v-if="actionMessage" class="alert" :class="actionMessageType">{{ actionMessage }}</div>
    <form @submit.prevent="submitForm" novalidate>
      <!-- title -->
      <div class="row">
        <div class="col"></div>
        <div class="col-8">
          <div class="card card-body bg-light mb-4 text-center">
            0 primary attendees and 0 guests
            <br />
            <small>(invites will only be sent to primary attendees)</small>
          </div>
        </div>
      </div>
      <!-- arrows -->
      <Arrows way="down" />
      <!-- step 01 -->
      <div class="card-deck">
        <div class="hidden-box"></div>
        <!-- step 01 box 1 -->
        <div class="card">
          <div class="card-header text-center">0 will receive the email invite</div>
          <div class="card-body">
            <div class="form-group">
              <label for="step01EmailSubject">Email Subject</label>
              <input
                id="step01EmailSubject"
                class="form-control"
                rows="3"
                type="email"
                v-model="step01.emailSubject"
              />
            </div>
            <div class="form-group">
              <label for="step01EmailMessage">Invite Message</label>
              <textarea
                id="step01EmailMessage"
                class="form-control"
                rows="3"
                v-model="step01.emailMessage"
                :class="{ 'is-invalid': $v.step01.emailMessage.$error }"
              >
              </textarea>
              <div class="invalid-feedback">{{ validationMessage.emailInviteMessage }}</div>
            </div>
          </div>
        </div>
        <!-- step 01 box 2 -->
        <div class="card">
          <div class="card-header text-center">0 will receive the text invite</div>
          <div class="card-body">
            <div class="form-group">
              <label for="step01TextMessage">Invite Message</label>
              <textarea
                id="step01TextMessage"
                class="form-control"
                rows="3"
                v-model="step01.textMessage"
              >
              </textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- arrows -->
      <Arrows way="left" />
      <!-- step 2 -->
      <div class="row" style="margin-top: -75px">
        <div class="col-5">
          <!-- step 2 box 1 -->
          <div class="card">
            <div class="card-header text-center">
              when they click the link in the email, it takes them to the opt-in page
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="step02IntroText">Intro Text</label>
                <textarea
                  id="step02IntroText"
                  class="form-control"
                  rows="3"
                  v-model="step02.introText"
                ></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    id="step02GuestFormShow"
                    class="form-check-input"
                    type="checkbox"
                    v-model="step02.guestFormShow"
                  />
                  <label class="form-check-label" for="step02GuestFormShow">Show Guest Form?</label>
                </div>
              </div>
              <div class="form-group">
                <label for="step02GuestFormMessage">
                  Guest Form Message
                </label>
                <textarea
                  id="step02GuestFormMessage"
                  class="form-control"
                  rows="3"
                  v-model="step02.guestFormMessage"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="step02LegalText">Legal Text</label>
                <textarea
                  id="step02LegalText"
                  class="form-control"
                  rows="3"
                  v-model="step02.legalText"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- arrows -->
      <Arrows way="right" :rowStyle="{ marginTop: '-75px' }" />
      <!-- step 3 -->
      <div class="card-deck">
        <div class="hidden-box"></div>
        <div class="card">
          <div class="card-header text-center">
            if they do not opt-in, they go to the RSVP page and receive one of these responses
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="step03EmailResponseYes">Yes Response</label>
              <textarea
                id="step03EmailResponseYes"
                class="form-control"
                rows="3"
                v-model="step03.emailResponseYes"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step03EmailResponseNo">No Response</label>
              <textarea
                id="step03EmailResponseNo"
                class="form-control"
                rows="3"
                v-model="step03.emailResponseNo"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step03EmailResponseSnooze">Snooze Response</label>
              <textarea
                id="step03EmailResponseSnooze"
                class="form-control"
                rows="3"
                v-model="step03.emailResponseSnooze"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header text-center">
            if they opt-in, they move into the text invite flow and receive one of these responses
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="step03TextResponseYes">Yes Response</label>
              <textarea
                id="step03TextResponseYes"
                class="form-control"
                rows="3"
                v-model="step03.textResponseYes"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step03TextResponseNo">No Response</label>
              <textarea
                id="step03TextResponseNo"
                class="form-control"
                rows="3"
                v-model="step03.textResponseNo"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step03TextResponseSnooze">Snooze Response</label>
              <textarea
                id="step03TextResponseSnooze"
                class="form-control"
                rows="3"
                v-model="step03.textResponseSnooze"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step03TextResponseUnknown">Unknown Response</label>
              <textarea
                id="step03TextResponseUnknown"
                class="form-control"
                rows="3"
                v-model="step03.textResponseUnknown"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- arrows -->
      <Arrows way="down" />
      <!-- step 4 -->
      <div class="card-deck">
        <div class="hidden-box"></div>
        <div class="card">
          <div class="card-header">
            <div class="form-inline justify-content-center">
              <div class="form-text">if snoozing, they'll receive a reminder after</div>
              <div class="form-group form-group-valid mx-2">
                <select
                  class="form-control"
                  id="step03EmailSnoozeDelayDays"
                  v-model="snoozeDelayDays"
                >
                  <option v-for="(item, index) in snoozeReminder" :key="index" :value="item.key">
                    {{ item.value }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="step04EmailSnoozeRemainder1">Snooze Reminder 1</label>
              <textarea
                id="step04EmailSnoozeRemainder1"
                class="form-control"
                rows="3"
                v-model="step04.emailSnoozeRemainder1"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step04EmailSnoozeRemainder2">Snooze Reminder 2</label>
              <textarea
                id="step04EmailSnoozeRemainder2"
                class="form-control"
                rows="3"
                v-model="step04.emailSnoozeRemainder2"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step04EmailLastChanceMessage">Last Chance Message</label>
              <textarea
                id="step04EmailLastChanceMessage"
                class="form-control"
                rows="3"
                v-model="step04.emailLastChanceMessage"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="form-inline justify-content-center">
              <div class="form-text">if snoozing, they'll receive a reminder after</div>
              <div class="form-group form-group-valid mx-2">
                <select
                  class="form-control"
                  id="step03TextSnoozeDelayDays"
                  v-model="snoozeDelayDays"
                >
                  <option v-for="(item, index) in snoozeReminder" :key="index" :value="item.key">
                    {{ item.value }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="step04TextSnoozeRemainder1">Snooze Reminder 1</label>
              <textarea
                id="step04TextSnoozeRemainder1"
                class="form-control"
                rows="3"
                v-model="step04.textSnoozeRemainder1"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step04TextSnoozeRemainder2">Snooze Reminder 2</label>
              <textarea
                id="step04TextSnoozeRemainder2"
                class="form-control"
                rows="3"
                v-model="step04.textSnoozeRemainder2"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="step04TextLastChanceMessage">Last Chance Message</label>
              <textarea
                id="step04TextLastChanceMessage"
                class="form-control"
                rows="3"
                v-model="step04.textLastChanceMessage"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- arrows -->
      <Arrows way="down" />
      <!-- step 5 -->
      <div class="row">
        <div class="col"></div>
        <div class="col-8">
          <div class="card">
            <div class="card-header">
              <div class="form-inline justify-content-center">
                <div class="form-text">the first ticket blast will be sent out</div>
                <div class="form-group form-group-valid m-2">
                  <select
                    class="form-control"
                    id="step05TicketBlastDelayHours1"
                    v-model="step05.ticketBlastDelayHours1"
                  >
                    <option
                      v-for="(item, index) in ticketBlastDelayHours1"
                      :key="index"
                      :value="item.key"
                    >
                      {{ item.value }}
                    </option>
                  </select>
                </div>
                <div class="form-text">
                  before the event, and the final ticket blast will be sent
                </div>
                <div class="form-group form-group-valid mx-2">
                  <select
                    class="form-control"
                    id="step05TicketBlastDelayHours2"
                    v-model="step05.ticketBlastDelayHours2"
                  >
                    <option
                      v-for="(item, index) in ticketBlastDelayHours2"
                      :key="index"
                      :value="item.key"
                    >
                      {{ item.value }}
                    </option>
                  </select>
                </div>
                <div class="form-text">before the event</div>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="step05TicketMessage">Ticket Message</label>
                <textarea
                  id="step05TicketMessage"
                  class="form-control"
                  rows="3"
                  v-model="step05.ticketMessage"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="step05TicketMessagesForAttendees">
                  Ticket Message for Attendees with Guests
                </label>
                <textarea
                  id="step05TicketMessagesForAttendees"
                  class="form-control"
                  rows="3"
                  v-model="step05.ticketMessagesForAttendees"
                ></textarea>
              </div>
            </div>
          </div>
          <!-- actions -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary btn-lg mt-4">Save Changes</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {} from 'vuelidate/lib/validators';
import Arrows from './EventMessageCenterUpdateArrows.vue';

export default {
  name: 'EventMessageCenterUpdate',
  components: { Arrows },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      actionMessage: null,
      actionMessageType: '',
      snoozeDelayDays: '',
      step01: {},
      step02: {},
      step03: {},
      step04: {},
      step05: {},
    };
  },
  validations() {
    return {
      step01: {
        emailMessage: {
          hasOptInUrl: (value) =>
            (typeof value !== 'undefined' ? value.indexOf('{{opt_in_url}}') !== -1 : false),
        },
      },
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    snoozeReminder() {
      const options = [];
      for (let i = 3; i < 15; i += 1) {
        options.push({ key: i, value: `${i} days` });
      }
      return options;
    },
    ticketBlastDelayHours1() {
      const options = [
        { key: 0, value: '(do not send)' },
        { key: 24, value: '24 hours' },
        { key: 48, value: '48 hours' },
        { key: 72, value: '72 hours' },
      ];

      return options;
    },
    ticketBlastDelayHours2() {
      const options = [
        { key: 0, value: '(do not send)' },
        { key: 1, value: '1 hour' },
      ];

      for (let i = 2; i < 9; i += 1) {
        options.push({ key: i, value: `${i} hours` });
      }
      return options;
    },
    validationMessage() {
      return {
        emailInviteMessage: 'Email invite message must have {{opt_in_url}}',
      };
    },
  },
  methods: {
    async loadData() {
      const item = await this.fetchItem(this.id);
      this.step01 = item.mcStep01 || {};
      this.step02 = item.mcStep02 || {};
      this.step03 = item.mcStep03 || {};
      this.step04 = item.mcStep04 || {};
      this.step05 = item.mcStep05 || {};

      this.snoozeDelayDays = item.mcStep04.emailSnoozeDelayDays;
    },
    submitForm() {
      this.$v.$touch();
      // submit if valid
      if (!this.$v.$invalid) {
        const item = {};

        item.mcStep01 = this.step01;
        item.mcStep02 = this.step02;
        item.mcStep03 = this.step03;
        item.mcStep04 = this.step04;
        item.mcStep05 = this.step05;

        item.mcStep04.emailSnoozeDelayDays = this.snoozeDelayDays;
        item.mcStep04.textSnoozeDelayDays = this.snoozeDelayDays;

        this.createOrUpdateItem({ id: this.id, item });
      } else {
        this.actionMessageType = 'alert-danger';
        this.actionMessage = 'Please review the problems below:';
      }
    },
    createOrUpdateItem({ id, item }) {
      this.$store
        .dispatch('eventMessageCenter/updateItem', { id, item })
        .then(() => {
          this.actionMessageType = 'alert-success';
          this.actionMessage = 'Message Center updated!';
        })
        .catch((error) => {
          console.log('[update-event-message] There was a problem processing your item.', error);
          this.actionMessageType = 'alert-danger';
          this.actionMessage = 'There was a problem updating this item.';
        });
    },
    ...mapActions({
      fetchItem: 'eventMessageCenter/fetchItem',
    }),
  },
};
</script>

<style scoped>
.hidden-box {
  display: flex;
  flex: 1 0 0%;
  flex-direction: column;
  margin-right: 15px;
  margin-bottom: 0;
  margin-left: 15px;
}
.is-valid {
  background-image: none;
}
</style>
