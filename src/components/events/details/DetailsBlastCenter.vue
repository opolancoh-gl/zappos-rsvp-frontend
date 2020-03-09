<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between">
      <div class="align-self-center">Blasts</div>
      <div>
        <a class="btn btn-sm btn-primary mr-2" href="/events/1/invite/blasts/new"
          ><!-- <i class="far fa-plus mr-1"></i> -->Invite</a
        ><a class="btn btn-sm btn-primary mr-2" href="/events/1/ticket/blasts/new">
          <i class="fas fa-plus mr-1"></i>
          <!-- <i class="far fa-plus mr-1"></i> -->Ticket</a
        ><a class="btn btn-sm btn-primary" href="/events/1/text_message/blasts/new">
          <i class="fas fa-plus mr-1"></i>
          <!-- <i class="far fa-plus mr-1"></i> -->Text Message</a
        >
      </div>
    </div>
    <div class="list-group list-group-flush">
      <div class="list-group-item">
        <div class="row">
          <div class="col align-self-center">
            <div class="media">
              <i class="far fa-share-square fa-2x ml-2 mr-4 text-muted align-self-center"></i>

              <div class="media-body align-self-center">
                First Ticket Blast<small class="d-block">Ticket Blast: To Confirmed</small>
              </div>
            </div>
          </div>
          <div class="col align-self-center"><div class="text-success">COMPLETED</div></div>
          <div class="col-2 align-self-center text-right"></div>
        </div>
      </div>
      <div class="list-group-item">
        <div class="row">
          <div class="col align-self-center">
            <div class="media">
              <i class="far fa-share-square fa-2x ml-2 mr-4 text-muted align-self-center"></i>

              <div class="media-body align-self-center">
                Final Ticket Blast<small class="d-block">Ticket Blast: To Confirmed</small>
              </div>
            </div>
          </div>
          <div class="col align-self-center"><div class="text-success">COMPLETED</div></div>
          <div class="col-2 align-self-center text-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventDetailsBlastCenter',
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
