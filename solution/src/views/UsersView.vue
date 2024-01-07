<template>
  <UsersTable />
</template>

<script>
// @ is an alias to /src
import UsersTable from "@/components/UsersTable.vue";

export default {
  name: "UserView",
  components: {
    UsersTable,
  },
};
</script>
