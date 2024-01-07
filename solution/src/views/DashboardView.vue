<template>
  <div class="container-md">
    <div class="row row-cols-1 row-cols-md-2 g-4 mt-5">
      <div class="col">
        <div class="card" style="max-width: 28rem">
          <div class="card-body">
            <h4 class="card-title mb-3">Uživatelé</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              optio illum laboriosam similique amet suscipit quod reprehenderit
              rerum aliquid harum, exercitationem delectus quae autem ipsum,
              nesciunt enim aliquam nulla consequatur? lorem ipsum dolor sit
              amet
            </p>
            <router-link
              tag="button"
              class="btn btn-primary me-3"
              :to="{ name: 'users' }"
            >
              Uživatelé
            </router-link>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" style="max-width: 28rem">
          <div class="card-body">
            <h4 class="card-title mb-3">Skupiny</h4>
            <p class="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              optio illum laboriosam similique amet suscipit quod reprehenderit
              rerum aliquid harum, exercitationem delectus quae autem ipsum,
              nesciunt enim aliquam nulla consequatur? lorem ipsum dolor sit
              amet
            </p>
            <router-link
              tag="button"
              class="btn btn-primary"
              :to="{ name: 'groups' }"
            >
              Vstoupit
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
};
</script>
