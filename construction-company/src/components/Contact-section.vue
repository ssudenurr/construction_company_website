
<script setup>
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
const { t } = useI18n();
</script>

<template>
    <!-- contact -->
    <section id="contact" class="py-24 bg-gray-50">
        <div class="max-w-4xl mx-auto px-6">
            <h2
                class="text-4xl uppercase font-extrabold text-center mb-12 relative inline-block after:content-[''] 
                after:block after:w-20 after:h-1 after:bg-yellow-500 after:mx-auto after:mt-3">
                {{ t('contact.contactUs') }}
            </h2>
            <form
                class="space-y-6 bg-slate-100 p-10 rounded-3xl shadow-slate-300 shadow-xl border border-gray-100">
                <!-- Name -->
                <div class="relative">
                    <span
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <icon icon="mdi:account" class="w-5 h-5"></icon>
                    </span>
                    <input
                        type="text"
                        :placeholder="t('contact.namePlaceholder')"
                        class="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 
                        focus:border-yellow-400 transition"
                    />
                </div>

                <!-- Email -->
                <div class="relative">
                    <span
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                    <icon icon="mdi:email" class="w-5 h-5"></icon>
                    </span>
                    <input
                    type="email"
                    :placeholder="t('contact.emailPlaceholder')"
                    class="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    />
                </div>

                <!-- Message -->
                <div class="relative">
                    <span class="absolute left-3 top-4 text-gray-400">
                    <icon icon="mdi:message-text" class="w-5 h-5"></icon>
                    </span>
                    <textarea
                    :placeholder="t('contact.messagePlaceholder')"
                    rows="4"
                    class="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    ></textarea>
                </div>

                <!-- Button -->
                <button
                    class="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg shadow-lg 
                    hover:from-yellow-600 hover:to-yellow-700 transform hover:-translate-y-1 transition duration-300 font-semibold 
                    uppercase tracking-wide">
                    {{ t('contact.sendMessage') }}
                </button>
            </form>
        </div>
    </section>
</template>
