<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-8 mx-auto">
        <div class="card">
          <div class="card-header">
            <ul class="CardNav nav nav-pills flex-column flex-sm-row">
              <li class="nav-item">
                <a class="nav-link active" href="javascript:history.go(-1)">&lt;</a>
              </li>
              <li class="nav-item text-center">
                New {{ blastTypeText }} Blast
              </li>
              <li class="nav-item text-center CardNav-hidden">
                >>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <p class="mb-5 text-center">
              This will send both emails and text messages
              depending on whether the attendee opted-in to
              receive text messages.
            </p>
            <form
              class="simple_form new_invite_blast"
              id="new_invite_blast"
              novalidate="novalidate"
              action="#"
              accept-charset="UTF-8"
              method="post"
              @submit.prevent="onSubmit"
            >
              <div
                class="form-group string required invite_blast_title form-group-valid"
              >
                <label
                  class="form-control-label string required"
                  for="invite_blast_title"
                  >Title
                  <abbr title="required">*</abbr></label
                ><input
                  class="form-control string required"
                  type="text"
                  v-model="invite.title"
                  name="invite_blast[title]"
                  id="invite_blast_title"
                />
              </div>
              <div
                class="form-group select required invite_blast_audience form-group-valid"
              >
                <label
                  class="form-control-label select required"
                  for="invite_blast_audience"
                  >Send Blast To
                  <abbr title="required">*</abbr></label
                ><select
                  class="form-control select required"
                  name="invite_blast[audience]"
                  id="invite_blast_audience"
                  v-model="invite.recipients"
                >
                  <option
                    selected="selected"
                    disabled="disabled"
                    value=""
                    >Choose an option</option
                  >
                  <option selected="selected" value="to_all"
                    >To All</option
                  >
                  <option value="to_new"
                    >To Only New</option
                  >
                  <option value="to_snoozed"
                    >To Snoozed</option
                  ></select
                >
              </div>
              <fieldset
                class="form-group boolean optional text_message_blast_send_to_guests"
                v-if="messageBlast"
              >
                <div class="form-check">
                  <input
                    class="form-check-input boolean optional"
                    type="checkbox"
                    value="1"
                    v-model="invite.send_to_guests"
                    id="text_message_blast_send_to_guests"
                  /><label
                    class="form-check-label boolean optional"
                    for="text_message_blast_send_to_guests"
                    >Also send to guests?</label
                  >
                </div>
              </fieldset>

              <div
                class="form-group text required text_message_blast_content"
                v-if="messageBlast"
              >
                <label
                  class="form-control-label text required"
                  for="text_message_blast_content"
                  >Message
                  <abbr title="required">*</abbr></label
                ><textarea
                  class="form-control text required"
                  v-model="invite.message"
                  id="text_message_blast_content"
                ></textarea>
              </div>
              <div
                class="form-group file optional text_message_blast_image form-group-valid"
                v-if="messageBlast"
              >
                <label
                  class="file optional"
                  for="text_message_blast_image"
                  >Image</label
                ><input
                  class="form-control-file is-valid file optional"
                  type="file"
                  @change.prevent="updateImage"
                  id="text_message_blast_image"
                />
              </div>
              <fieldset
                class="form-group boolean optional text_message_blast_attach_attendee_ticket"
                v-if="messageBlast"
              >
                <div class="form-check">
                  <input
                    class="form-check-input boolean optional"
                    type="checkbox"
                    v-model="invite.attach_ticket"
                    id="text_message_blast_attach_attendee_ticket"
                  /><label
                    class="form-check-label boolean optional"
                    for="text_message_blast_attach_attendee_ticket"
                    >Attach attendee ticket?</label
                  >
                </div>
              </fieldset>
              <fieldset
                class="form-group boolean optional text_message_blast_attach_guest_tickets"
                v-if="messageBlast"
              >
                <div class="form-check">
                  <input
                    class="form-check-input boolean optional"
                    type="checkbox"
                    v-model="invite.attach_guests_ticket"
                    id="text_message_blast_attach_guest_tickets"
                  /><label
                    class="form-check-label boolean optional"
                    for="text_message_blast_attach_guest_tickets"
                    >Attach guest tickets?</label
                  >
                </div>
              </fieldset>

              <fieldset
                class="form-group boolean optional invite_blast_scheduled"
              >
                <div class="form-check">
                  <input
                    class="form-check-input boolean optional"
                    type="checkbox"
                    v-model="scheduled"
                    name="invite_blast[scheduled]"
                    id="invite_blast_scheduled"
                  /><label
                    class="form-check-label boolean optional"
                    for="invite_blast_scheduled"
                    >Schedule for later?</label
                  >
                </div>
              </fieldset>
              <div
                class="card card-body bg-light mb-3"
                id="scheduled_details"
                v-if="scheduled"
              >
                <div
                  class="form-group datetime optional invite_blast_scheduled_time"
                >
                  <label
                    class="form-control-label datetime optional"
                    for="invite_blast_scheduled_time_2i"
                    >Date &amp; Time</label
                  >
                  <div
                    class="d-flex flex-row justify-content-between align-items-center"
                  >
                    <select
                      id="invite_blast_scheduled_time_2i"
                      v-model="schedule.month"
                      class="form-control mx-1 datetime optional"
                    >
                      <option
                        v-for="(monthName, mnth) in months"
                        :key="mnth"
                        :value="mnth"
                        :selected="mnth === schedule.month"
                      >
                        {{ monthName }}
                      </option>
                    </select>
                    <select
                      id="invite_blast_scheduled_time_3i"
                      name="invite_blast[scheduled_time(3i)]"
                      v-model="schedule.day"
                      class="form-control mx-1 datetime optional"
                    >
                      <option
                        v-for="day in days"
                        :key="day"
                        :value="day"
                        :selected="day === schedule.day"
                      >
                        {{ day }}
                      </option>
                    </select>
                    <select
                      id="invite_blast_scheduled_time_1i"
                      name="invite_blast[scheduled_time(1i)]"
                      class="form-control mx-1 datetime optional"
                      v-model="schedule.year"
                    >
                      <option
                        v-for="year in years"
                        :key="year"
                        :value="year"
                        :selected="year === schedule.year"
                      >
                        {{ year }}
                      </option>
                    </select>
                    —
                    <select
                      id="invite_blast_scheduled_time_4i"
                      name="invite_blast[scheduled_time(4i)]"
                      class="form-control mx-1 datetime optional"
                      v-model="schedule.hour"
                    >
                      <option
                        v-for="(hour, idx) in hours"
                        :key="idx"
                        :value="idx"
                        :selected="idx === schedule.hour"
                      >
                        {{ hour }}
                      </option>
                    </select>
                    :
                    <select
                      id="invite_blast_scheduled_time_5i"
                      name="invite_blast[scheduled_time(5i)]"
                      v-model="schedule.minute"
                      class="form-control mx-1 datetime optional"
                    >
                      <option
                        v-for="(minute, idx) in minutes"
                        :key="idx"
                        :value="idx"
                        :selected="
                          minute === schedule.minute
                        "
                      >
                        {{ minute }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <p
                class="alert alert-warning text-center"
                v-if="!scheduled"
                id="immediate_send_warning"
              >
                This will send the messages as soon as you
                submit!
              </p>
              <input
                type="submit"
                name="commit"
                value="Blast it out!"
                class="btn btn-primary btn-block btn-lg"
                data-confirm="Are you sure?"
                data-disable-with="Blast it out!"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const BLAST_TYPE = {
  __invite: 'Invite',
  __message: 'Message',
  __ticket: 'Ticket',
};

export default {
  name: 'NewBlast',
  data() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes() + 1;
    return {
      scheduled: false,
      blastType: '__invite',
      invite: {},
      schedule: {
        day: now.getDate(),
        month,
        year,
        hour,
        minute,
      },
      month,
      year,
      months: MONTHS,
      years: [...Array(10).keys()].map(
        (offset) => now.getFullYear() + offset,
      ),
      hours: [...Array(23).keys()].map((offset) =>
        `${offset}`.padStart(2, '0'),
      ),
      minutes: [...Array(60).keys()].map((offset) =>
        `${offset}`.padStart(2, '0'),
      ),
    };
  },
  computed: {
    ...mapState(['blast/items']),
    days() {
      return getDaysInMonth(this.month, this.year);
    },
    messageBlast() {
      return this.blastType === '__message';
    },
    blastTypeText() {
      return BLAST_TYPE[this.blastType];
    },
  },
  created() {
    this.blastType = this.$route.params.type || '__invite';
    this.getBlasts();
  },
  methods: {
    isSelected(k) {
      return parseInt(k, 10) === this.month
        ? 'selected'
        : '';
    },
    async updateImage(evt) {
      const file = evt.target.files[0];
      const result = await toBase64(file).catch((e) => Error(e));
      if (result instanceof Error) {
        console.log('Error: ', result.message);
        return;
      }
      this.invite.image = result;
    },
    async onSubmit() {
      const data = {
        ...this.invite,
        event: this.$route.params.id,
        type: this.blastType,
      };
      if (this.scheduled) {
        const schedule = new Date();
        schedule.setMonth(this.schedule.month);
        schedule.setDate(this.schedule.day);
        schedule.setFullYear(this.schedule.year);
        schedule.setHours(this.schedule.hour);
        schedule.setMinutes(this.schedule.minute);
        data.schedule = schedule;
      }
      await this.createBlast(data);
      this.$router.push({
        name: 'EventBlastCenter',
      });
    },
    ...mapActions({
      getBlasts: 'blast/getItemsFromAPI',
      createBlast: 'blast/createItem',
    }),
  },
};
</script>

<style lang="scss">
  .CardNav {
    align-items: center;
    justify-content: space-between;
    &-hidden {
      color: #006fe6;
      &::selection {
        background-color: transparent;
      }
    }
  }
</style>
