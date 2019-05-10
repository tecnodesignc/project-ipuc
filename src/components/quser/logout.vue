<script>
  export default {
    mounted() {
      this.$store.dispatch("auth/AUTH_LOGOUT")
    }
  }
</script>

