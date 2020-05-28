<template>
  <div class="Blast container my-4">
    <div class="card mb-4">
      <div
        class="card-header d-flex justify-content-between"
      >
        <div class="align-self-center">Blasts</div>
        <div>
          <router-link
            class="btn btn-sm btn-primary mr-2"
            :to="{
              name: 'NewBlast',
              params: {
                type: '__invite',
              },
            }"
          >
            <i class="fas fa-plus mr-1"></i>Invite
          </router-link>
          <router-link
            class="btn btn-sm btn-primary mr-2"
            :to="{
              name: 'NewBlast',
              params: {
                type: '__ticket',
              },
            }"
          >
            <i class="fas fa-plus mr-1"></i>Ticket
          </router-link>
          <router-link
            class="btn btn-sm btn-primary mr-2"
            :to="{
              name: 'NewBlast',
              params: {
                type: '__message',
              },
            }"
          >
            <i class="fas fa-plus mr-1"></i> Text Message
          </router-link>
        </div>
      </div>
      <div
        class="Blast-sentBlasts list-group list-group-flush"
      >
        <div
          class="list-group-item"
          v-for="invite in blasts"
          :key="invite.id"
        >
          <div class="row">
            <code class="col-sm-12" style="display: none">
              {{ invite }}
            </code>
            <div class="col align-self-center">
              <div class="media">
                <i
                  class="fas fa-2x fa-share-square ml-2 mr-4 text-muted align-self-center"
                ></i>
                <div class="media-body align-self-center">
                  <a
                    data-toggle="tooltip"
                    :title="
                      `Created on ${getDate(
                        invite,
                      )} at ${getTime(
                        invite,
                      )} by ${getCreator(invite)}`
                    "
                    href="/events/1/text_message/blasts/1/edit"
                  >
                    {{ invite.title }} </a
                  ><small class="d-block">
                    {{ getBlastType(invite) }} :
                    {{ getRecipient(invite) }}
                  </small>
                  <div
                    class="card bg-light p-2 mt-2 mb-0"
                    v-if="invite.message"
                  >
                    <small>{{ invite.message }}</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col align-self-center">
              {{ getInviteStatus(invite) }}
            </div>
            <div class="col-3 align-self-center text-right">
              <a
                class="btn btn-sm btn-outline-primary mr-2"
                href="/events/1/text_message/blasts/1/edit"
                ><i class="fas fa-pencil-alt mr-2"></i
                >Edit</a
              ><a
                data-confirm="Are you sure?"
                class="btn btn-sm btn-outline-primary"
                rel="nofollow"
                data-method="delete"
                href="#"
                @click.prevent="deleteInvite(invite)"
                ><i class="fas fa-times mr-2"></i>Delete</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div
        class="card-header d-flex justify-content-between"
      >
        <div class="align-self-center">
          Scheduled For Later
        </div>
      </div>
      <div class="list-group list-group-flush">
        <div
          class="list-group-item"
          v-for="invite in scheduledBlasts"
          :key="invite.id"
        >
          <code style="display: none">
            {{ invite }}
          </code>
          <div class="row">
            <div class="col align-self-center">
              <div class="media">
                <i
                  class="fas fa-2x fa-share-square ml-2 mr-4 text-muted align-self-center"
                ></i>
                <div class="media-body align-self-center">
                  <a
                    data-toggle="tooltip"
                    :title="
                      `Created on ${getDate(
                        invite,
                      )} at ${getTime(
                        invite,
                      )} by ${getCreator(invite)}`
                    "
                    href="/events/1/ticket/blasts/1/edit"
                  >
                    {{ invite.title }} </a
                  ><small class="d-block">
                    {{ getBlastType(invite) }} :
                    {{ getRecipient(invite) }}
                    <div
                      class="card bg-light p-2 mt-2 mb-0"
                      v-if="invite.message"
                    >
                      <small>{{ invite.message }}</small>
                    </div>
                  </small>
                </div>
              </div>
            </div>
            <div class="col align-self-center">
              Scheduled for
              {{ getDate(invite, 'scheduledAt') }} at
              {{ getTime(invite, 'scheduledAt') }}
            </div>
            <div class="col-2 align-self-center text-right">
              <a
                class="btn btn-sm btn-outline-primary mr-2"
                href="/events/1/ticket/blasts/1/edit"
                ><i class="fas fa-pencil-alt mr-2"></i
                >Edit</a
              ><a
                data-confirm="Are you sure?"
                class="btn btn-sm btn-outline-primary"
                rel="nofollow"
                data-method="delete"
                href="#"
                @click.prevent="deleteInvite(invite)"
              >
                <i class="fas fa-times mr-2"></i>Delete</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';

function not(action) {
  return (value) => !action(value);
}

function isSimpleBlast(blast) {
  const schedule = new Date(blast.schedule);
  const now = new Date();
  return blast.scheduled === 'no' ||
          blast.sent_status === 'completed' || schedule < now;
}

export default {
  data() {
    return {
      recipient_types: {
        to_all: 'To All',
        to_new: 'To Only New',
        to_snoozed: 'To Snoozed',
      },
    };
  },
  computed: {
    ...mapState({
      users: ({ user }) => user.items,
      currentUser: ({ me }) => me,
      currentEvent: ({ event }) => event.currentItem,
      blasts: ({ blast }) =>
        blast.items
          .filter(isSimpleBlast)
          .map((blast) => {
            blast.createdAt = new Date(blast.created);
            return blast;
          }),
      scheduledBlasts: ({ blast }) =>
        blast.items
          .filter(not(isSimpleBlast))
          .map((blast) => {
            if (blast.created) {
              blast.createdAt = new Date(blast.created);
            }
            if (blast.schedule) {
              blast.scheduledAt = new Date(blast.schedule);
            }
            return blast;
          }),
    }),
  },
  created() {
    this.updateCurrentUser();
    this.getBlasts({
      event: this.$route.params.id,
    });
    if (!this.users || !this.users.length) {
      this.getUsers();
    }
  },
  updated() {
    window.jQuery('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    ...mapActions({
      getBlasts: 'blast/getItemsFromAPI',
      deleteBlast: 'blast/deleteItem',
      getUsers: 'user/getItemsFromAPI',
      updateCurrentUser: 'me',
    }),
    getBlastType(invite) {
      let inviteType = '';
      switch (invite.type) {
        case '__invite':
          inviteType = 'Invite';
          break;
        case '__ticket':
          inviteType = 'Ticket';
          break;
        case '__message':
          inviteType = 'Text Message';
          break;
        default:
          break;
      }
      return `${inviteType} Blast`;
    },
    async deleteInvite(invite) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0062cc',
        cancelButtonColor: '#b2b3b3',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.value) {
        await this.deleteBlast(invite);
        this.getBlasts({
          event: this.$route.params.id,
        });
        Swal.fire(
          'Deleted!',
          'The element has been deleted.',
          'success',
        );
      }
    },
    getCreator(invite) {
      if (
        this.currentUser &&
        this.currentUser.id === invite.createdBy
      ) {
        return this.currentUser.username;
      }
      const user = this.users
        .filter((user) => user.id === invite.createdBy)
        .pop();
      if (user) {
        return user.username;
      }
      return 'Unknown User';
    },
    getDate(invite, key = 'createdAt') {
      return new Intl.DateTimeFormat('en-US').format(
        invite[key],
      );
    },
    getTime(invite, key = 'createdAt') {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };
      return new Intl.DateTimeFormat(
        'en-US',
        options,
      ).format(invite[key]);
    },
    getRecipient(invite) {
      return this.recipient_types[invite.recipients];
    },
    getInviteStatus(invite) {
      let res = 'Not Started Yet';
      switch (invite.sent_status) {
        case 'not_started':
          res = 'Not Started Yet';
          break;
        case 'started':
          res = 'Started';
          break;
        case 'failed':
          res = 'Failed';
          break;
        case 'completed':
          res = 'Completed';
          break;
        default:
          break;
      }
      return res;
    },
  },
};
</script>

<style lang="scss">
.Blast {
  &-sentBlasts {
    max-height: 40vh;
    overflow-y: auto;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(167, 167, 167);
    border-radius: 2px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(116, 116, 116);
  }
}
</style>
