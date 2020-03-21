<template>
  <form class="simple_form edit_event_message_center" id="edit_event_message_center_1">
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
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div class="mb-4 text-center text-muted">
          <i class="fas fa-long-arrow-alt-down fa-4x"></i>
          <!-- <i class="far fa-long-arrow-down fa-4x"></i> -->
        </div>
      </div>
      <div class="col">
        <div class="mb-4 text-center text-muted">
          <i class="fas fa-long-arrow-alt-down fa-4x"></i>
          <!-- <i class="far fa-long-arrow-down fa-4x"></i> -->
        </div>
      </div>
    </div>
    <!-- step 1 -->
    <div class="card-deck">
      <div class="hidden-box"></div>
      <!-- step 1 box 1 -->
      <div class="card">
        <div class="card-header text-center">0 will receive the email invite</div>
        <div class="card-body">
          <div class="form-group email optional form-group-valid">
            <label
              class="form-control-label email optional"
              for="event_message_center_email_invite_subject"
              >Email Subject</label
            >
            <input
              class="form-control is-valid string email optional"
              rows="3"
              type="email"
              v-model="message.step_1_b1_1"
              id="event_message_center_email_invite_subject"
            />
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_email_invite_message"
              >Invite Message</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_email_invite_message"
              v-model="message.step_1_b1_2"
            >
            </textarea>
          </div>
        </div>
      </div>
      <!-- step 1 box 2 -->
      <div class="card">
        <div class="card-header text-center">0 will receive the text invite</div>
        <div class="card-body">
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_text_invite_message"
              >Invite Message</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_text_invite_message"
              v-model="message.step_1_b2_1"
            >
            </textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- arrows -->
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div class="my-4 text-center text-muted">
          <i class="fas fa-level-down-alt fa-4x fa-rotate-90"></i>
          <!-- <i class="far fa-level-down-alt fa-4x fa-rotate-90"></i> -->
        </div>
      </div>
      <div class="col">
        <div class="my-4 text-center text-muted">
          <i class="fas fa-long-arrow-alt-down fa-4x"></i>
          <!-- <i class="far fa-long-arrow-down fa-4x"></i> -->
        </div>
      </div>
    </div>
    <!-- step 2 -->
    <div class="row" style="margin-top: -75px">
      <div class="col-5">
        <!-- step 2 box 1 -->
        <div class="card">
          <div class="card-header text-center">
            when they click the link in the email, it takes them to the opt-in page
          </div>
          <div class="card-body">
            <div class="form-group text optional form-group-valid">
              <label
                class="form-control-label text optional"
                for="event_message_center_optin_intro_text"
                >Intro Text</label
              >
              <textarea
                class="form-control is-valid text optional"
                rows="3"
                id="event_message_center_optin_intro_text"
                v-model="message.step_2_b1_1"
              ></textarea>
            </div>
            <fieldset class="form-group boolean optional event_message_center_optin_guest_form">
              <div class="form-check">
                <input type="hidden" value="0" />
                <input
                  class="form-check-input boolean optional"
                  type="checkbox"
                  value="1"
                  id="event_message_center_optin_guest_form"
                />
                <label
                  class="form-check-label boolean optional"
                  for="event_message_center_optin_guest_form"
                  >Show Guest Form?</label
                >
              </div>
            </fieldset>
            <div class="form-group text optional form-group-valid">
              <label
                class="form-control-label text optional"
                for="event_message_center_optin_guest_text"
                >Guest Form Message</label
              >
              <textarea
                class="form-control is-valid text optional"
                rows="3"
                id="event_message_center_optin_guest_text"
                v-model="message.step_2_b1_2"
              ></textarea>
            </div>
            <div class="form-group text optional form-group-valid">
              <label
                class="form-control-label text optional"
                for="event_message_center_optin_legal_text"
                >Legal Text</label
              >
              <textarea
                class="form-control is-valid text optional"
                rows="3"
                id="event_message_center_optin_legal_text"
                v-model="message.step_2_b1_3"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- arrows -->
    <div class="row" style="margin-top: -75px">
      <div class="col"></div>
      <div class="col">
        <div class="my-4 text-center text-muted">
          <i class="fas fa-level-down-alt fa-4x"></i>
          <!-- <i class="far fa-level-up-alt fa-4x fa-rotate-270 fa-flip-vertical"></i> -->
        </div>
      </div>
      <div class="col">
        <div class="my-4 text-center text-muted">
          <i class="fas fa-level-down-alt fa-4x"></i>
          <!-- <i class="far fa-level-up-alt fa-4x fa-rotate-270 fa-flip-vertical"></i> -->
        </div>
      </div>
    </div>
    <!-- step 3 -->
    <div class="card-deck">
      <div class="hidden-box"></div>
      <div class="card">
        <div class="card-header text-center">
          if they do not opt-in, they go to the RSVP page and receive one of these responses
        </div>
        <div class="card-body">
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_email_yes_response"
              >Yes Response</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_email_yes_response"
              v-model="message.step_3_b1_1"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_email_no_response"
              >No Response</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_email_no_response"
              v-model="message.step_3_b1_2"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_email_snooze_response"
              >Snooze Response</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_email_snooze_response"
              v-model="message.step_3_b1_3"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header text-center">
          if they opt-in, they move into the text invite flow and receive one of these responses
        </div>
        <div class="card-body">
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_text_yes_response"
              >Yes Response</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_text_yes_response"
              v-model="message.step_3_b2_1"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_text_no_response"
              >No Response</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_text_no_response"
              v-model="message.step_3_b2_2"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_text_snooze_response"
              >Snooze Response</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_text_snooze_response"
              v-model="message.step_3_b2_3"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_text_unknown_response"
              >Unknown Response</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_text_unknown_response"
              v-model="message.step_3_b2_4"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- arrows -->
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div class="my-4 text-center text-muted">
          <i class="fas fa-long-arrow-alt-down fa-4x"></i>
          <!-- <i class="far fa-long-arrow-down fa-4x"></i> -->
        </div>
      </div>
      <div class="col">
        <div class="my-4 text-center text-muted">
          <i class="fas fa-long-arrow-alt-down fa-4x"></i>
          <!-- <i class="far fa-long-arrow-down fa-4x"></i> -->
        </div>
      </div>
    </div>
    <!-- step 4 -->
    <div class="card-deck">
      <div class="hidden-box"></div>
      <div class="card">
        <div class="card-header">
          <div class="form-inline justify-content-center">
            <div class="form-text">if snoozing, they'll receive a reminder after</div>
            <div class="form-group select optional form-group-valid mx-2">
              <select
                class="form-control is-valid select optional"
                id="event_message_center_snooze_delay_hours"
              >
                <option selected="selected" value="72">3 days</option>
                <option value="96">4 days</option>
                <option value="120">5 days</option>
                <option value="144">6 days</option>
                <option value="168">7 days</option>
                <option value="192">8 days</option>
                <option value="216">9 days</option>
                <option value="240">10 days</option>
                <option value="264">11 days</option>
                <option value="288">12 days</option>
                <option value="312">13 days</option>
                <option value="336">14 days</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_email_snooze_reminder_1"
              >Snooze Reminder 1</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_email_snooze_reminder_1"
              v-model="message.step_4_b1_1"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_email_snooze_reminder_2"
              >Snooze Reminder 2</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_email_snooze_reminder_2"
              v-model="message.step_4_b1_2"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_email_last_chance_message"
              >Last Chance Message</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_email_last_chance_message"
              v-model="message.step_4_b1_3"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="form-inline justify-content-center">
            <div class="form-text">if snoozing, they'll receive a reminder after</div>
            <div class="form-group select optional disabled form-group-valid mx-2">
              <select
                class="form-control is-valid select optional disabled"
                id="event_message_center_snooze_delay_hours_copy"
              >
                <option selected="selected" value="72">3 days</option>
                <option value="96">4 days</option>
                <option value="120">5 days</option>
                <option value="144">6 days</option>
                <option value="168">7 days</option>
                <option value="192">8 days</option>
                <option value="216">9 days</option>
                <option value="240">10 days</option>
                <option value="264">11 days</option>
                <option value="288">12 days</option>
                <option value="312">13 days</option>
                <option value="336">14 days</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_text_snooze_reminder_1"
              >Snooze Reminder 1</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_text_snooze_reminder_1"
              v-model="message.step_4_b2_1"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_text_snooze_reminder_2"
              >Snooze Reminder 2</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_text_snooze_reminder_2"
              v-model="message.step_4_b2_2"
            ></textarea>
          </div>
          <div class="form-group text optional form-group-valid">
            <label
              class="form-control-label text optional"
              for="event_message_center_text_last_chance_message"
              >Last Chance Message</label
            >
            <textarea
              class="form-control is-valid text optional"
              rows="3"
              id="event_message_center_text_last_chance_message"
              v-model="message.step_4_b2_3"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- arrows -->
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div class="my-4 text-center text-muted">
          <i class="fas fa-long-arrow-alt-down fa-4x"></i>
          <!-- <i class="far fa-long-arrow-down fa-4x"></i> -->
        </div>
      </div>
      <div class="col">
        <div class="my-4 text-center text-muted">
          <i class="fas fa-long-arrow-alt-down fa-4x"></i>
          <!-- <i class="far fa-long-arrow-down fa-4x"></i> -->
        </div>
      </div>
    </div>
    <!-- step 5 -->
    <div class="row">
      <div class="col"></div>
      <div class="col-8">
        <div class="card">
          <div class="card-header">
            <div class="form-inline justify-content-center">
              <div class="form-text">the first ticket blast will be sent out</div>
              <div class="form-group select optional form-group-valid m-2">
                <select
                  class="form-control is-valid select optional"
                  id="event_message_center_auto_ticket_blast_1_delay_hours"
                >
                  <option value="0">(do not send)</option>
                  <option value="24">24 hours</option>
                  <option selected="selected" value="48">48 hours</option>
                  <option value="72">72 hours</option>
                </select>
              </div>
              <div class="form-text">before the event, and the final ticket blast will be sent</div>
              <div class="form-group select optional form-group-valid mx-2">
                <select
                  class="form-control is-valid select optional"
                  id="event_message_center_auto_ticket_blast_2_delay_hours"
                >
                  <option value="0">(do not send)</option>
                  <option value="1">1 hour</option>
                  <option selected="selected" value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                  <option value="5">5 hours</option>
                  <option value="6">6 hours</option>
                  <option value="7">7 hours</option>
                  <option value="8">8 hours</option>
                </select>
              </div>
              <div class="form-text">before the event</div>
            </div>
          </div>
          <div class="card-body">
            <div
              class="form-group text optional event_message_center_ticket_message form-group-valid"
            >
              <label
                class="form-control-label text optional"
                for="event_message_center_ticket_message"
                >Ticket Message</label
              >
              <textarea
                class="form-control is-valid text optional"
                rows="3"
                id="event_message_center_ticket_message"
                v-model="message.step_5_b1_1"
              ></textarea>
            </div>
            <div class="form-group text optional form-group-valid">
              <label
                class="form-control-label text optional"
                for="event_message_center_ticket_message_with_guest"
                >Ticket Message for Attendees with Guests</label
              >
              <textarea
                class="form-control is-valid text optional"
                rows="3"
                id="event_message_center_ticket_message_with_guest"
                v-model="message.step_5_b1_2"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <input
            type="submit"
            name="commit"
            value="Save Changes"
            class="btn btn-primary btn btn-primary btn-lg mt-4"
            data-disable-with="Save Changes"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { message } from './DetailsMessageCenterParams';

export default {
  data() {
    return { message: {} };
  },
  components: {},
  created() {
    this.message = message;
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
