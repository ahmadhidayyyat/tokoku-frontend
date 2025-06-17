<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

const defaultOpen = useCookie<boolean>("sidebar_state");
</script>

<template>
  <SidebarProvider :default-open="defaultOpen">
    <LayoutAdminSidebar />

    <main class="p-4">
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>
