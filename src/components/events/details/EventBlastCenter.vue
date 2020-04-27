<template>
  <div class="container my-4">
    <div class="card mb-4">
      <div
        class="card-header d-flex justify-content-between"
      >
        <div class="align-self-center">Blasts</div>
        <div>
          <a
            class="btn btn-sm btn-primary mr-2"
            href="/events/1/invite/blasts/new"
            > <i class="fas fa-plus mr-1"></i> Invite</a
          ><a
            class="btn btn-sm btn-primary mr-2"
            href="/events/1/ticket/blasts/new"
            > <i class="fas fa-plus mr-1"></i> Ticket</a
          ><a
            class="btn btn-sm btn-primary"
            href="/events/1/text_message/blasts/new"
            > <i class="fas fa-plus mr-1"></i> Text
            Message</a
          >
        </div>
      </div>
      <div class="list-group list-group-flush">
        <div class="list-group-item">
          <div class="row">
            <div class="col align-self-center">
              <div class="media">
                <i class="fas fa-2x fa-share-square ml-2 mr-4 text-muted align-self-center"></i>
                <div class="media-body align-self-center">
                  <a
                    data-toggle="tooltip"
                    title=""
                    href="/events/1/invite/blasts/1/edit"
                    data-original-title="Created on 04/20/20 at  1:07pm by Adam Admin"
                    >Invite Blast</a
                  ><small class="d-block"
                    >Invite Blast: To Only New</small
                  >
                </div>
              </div>
            </div>
            <div class="col align-self-center">
              Not Started Yet
            </div>
            <div class="col-2 align-self-center text-right">
              <a
                class="btn btn-sm btn-outline-primary mr-2"
                href="/events/1/invite/blasts/1/edit"
                ><i class="fas fa-pencil-alt mr-2"></i>Edit</a
              ><a
                data-confirm="Are you sure?"
                class="btn btn-sm btn-outline-primary"
                rel="nofollow"
                data-method="delete"
                href="/events/1/invite/blasts/1"
                ><i class="fas fa-times mr-2"></i>Delete</a
              >
            </div>
          </div>
        </div>
        <div class="list-group-item">
          <div class="row">
            <div class="col align-self-center">
              <div class="media">
                <i class="fas fa-2x fa-share-square ml-2 mr-4 text-muted align-self-center"></i>
                <div class="media-body align-self-center">
                  <a
                    data-toggle="tooltip"
                    title=""
                    href="/events/1/text_message/blasts/1/edit"
                    data-original-title="Created on 04/20/20 at  1:08pm by Adam Admin"
                    >Hi</a
                  ><small class="d-block"
                    >Text Message Blast: To All</small
                  >
                  <div class="card bg-light p-2 mt-2 mb-0">
                    <small>this is a message</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col align-self-center">
              Not Started Yet
            </div>
            <div class="col-2 align-self-center text-right">
              <a
                class="btn btn-sm btn-outline-primary mr-2"
                href="/events/1/text_message/blasts/1/edit"
                ><i class="fas fa-pencil-alt mr-2"></i>Edit</a
              ><a
                data-confirm="Are you sure?"
                class="btn btn-sm btn-outline-primary"
                rel="nofollow"
                data-method="delete"
                href="/events/1/text_message/blasts/1"
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
        <div class="list-group-item">
          <div class="row">
            <div class="col align-self-center">
              <div class="media">
                <i class="fas fa-2x fa-share-square ml-2 mr-4 text-muted align-self-center"></i>
                <div class="media-body align-self-center">
                  <a
                    data-toggle="tooltip"
                    title=""
                    href="/events/1/ticket/blasts/1/edit"
                    data-original-title="Created on 04/16/20 at  9:28pm"
                    >First Ticket Blast</a
                  ><small class="d-block"
                    >Ticket Blast: To Confirmed</small
                  >
                </div>
              </div>
            </div>
            <div class="col align-self-center">
              Scheduled for 04/14/20 at 1:01am EDT
            </div>
            <div class="col-2 align-self-center text-right">
              <a
                class="btn btn-sm btn-outline-primary mr-2"
                href="/events/1/ticket/blasts/1/edit"
                ><i class="fas fa-pencil-alt mr-2"></i>Edit</a
              ><a
                data-confirm="Are you sure?"
                class="btn btn-sm btn-outline-primary"
                rel="nofollow"
                data-method="delete"
                href="/events/1/ticket/blasts/1"
                > <i class="fas fa-times mr-2"></i>Delete</a
              >
            </div>
          </div>
        </div>
        <div class="list-group-item">
          <div class="row">
            <div class="col align-self-center">
              <div class="media">
                <i class="fal fa-2x fa-share-square ml-2 mr-4 text-muted align-self-center"></i>
                <div class="media-body align-self-center">
                  <a
                    data-toggle="tooltip"
                    title=""
                    href="/events/1/ticket/blasts/2/edit"
                    data-original-title="Created on 04/16/20 at  9:28pm"
                    >Final Ticket Blast</a
                  ><small class="d-block"
                    >Ticket Blast: To Confirmed</small
                  >
                </div>
              </div>
            </div>
            <div class="col align-self-center">
              Scheduled for 04/15/20 at 11:01pm EDT
            </div>
            <div class="col-2 align-self-center text-right">
              <a
                class="btn btn-sm btn-outline-primary mr-2"
                href="/events/1/ticket/blasts/2/edit"
                ><i class="fas fa-pencil-alt mr-2"></i>Edit</a
              ><a
                data-confirm="Are you sure?"
                class="btn btn-sm btn-outline-primary"
                rel="nofollow"
                data-method="delete"
                href="/events/1/ticket/blasts/2"
                > <i class="fas fa-times mr-2"></i>Delete</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    /* axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response)); */
  },
};
</script>

<style scoped></style>
