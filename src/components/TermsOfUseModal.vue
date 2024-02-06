<script setup>
defineProps({
    openCloasTermsOfUse: Function
})
</script>
<template>
    <div class="modal_contenaire" >
        <div class="modal" >
            <h1>
                Terms of Use for Plots
            </h1>
            <h2>1. Acceptance of Terms</h2>
    <p>Purchasing and using advertisement plots on the Morphée213 application implies full and complete acceptance of these terms of use.</p>

    <h2>2. Rights to Content</h2>
    <p>- Users must possess all copyrights or have obtained necessary permissions for any content (images, texts, trademarks, logos, etc.) they wish to display on their plot.

        The responsibility for verifying and ensuring the legality of the disseminated content falls entirely upon the user.</p>

    <h2>3. Prohibited Content</h2>
    <p>It is strictly prohibited to broadcast on the plots:</p>
    <ul>
    <li>Pornographic images or contents.</li>
    <li>Messages inciting hatred, violence, terrorism, or any form of discrimination.</li>
    <li>Any illegal content or in violation of others' rights (copyright, registered trademark, privacy, etc.).</li>
    <li>Misleading or false advertising.</li>
    </ul>

    <h2>4. Compliance with Laws</h2>
    <p>Users must ensure that their content complies with laws and regulations in force in their country and in countries targeted by their advertising.

    In case of non-compliance with laws and regulations, the user will be solely responsible for any legal and financial consequences that may result.</p>

    <h2>5. Removal and Penalties</h2>
    <p>- Morphée213 reserves the right to remove without notice any content deemed non-compliant with these terms.

        Penalties, which may include permanent exclusion from the application, can be applied in cases of repeated or serious violations of these terms.</p>

    <h2>6. Changes to Terms of Use</h2>
    <p>- Morphée213 reserves the right to modify these terms of use at any time. Users will be informed of significant changes through notification or email.</p>

    <h2>7. Morphée213 Liability</h2>
    <p>- Morphée213 cannot be held responsible for content disseminated by users on their plots.

        Morphée213 does not guarantee systematic verification of content but will act swiftly upon receiving a report of inappropriate content.</p>
            <button @click="openCloasTermsOfUse" >Close</button>
        </div>

    </div>
</template>