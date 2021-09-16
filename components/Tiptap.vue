<template>
  <v-card>
    <v-item-group v-if="editor" class="d-flex flex-wrap justify-space-between">
      <v-btn-toggle v-model="toggleTextBtns" multiple dense borderless>
        <v-btn
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <v-icon small>mdi-format-bold</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <v-icon small>mdi-format-italic</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <v-icon small>mdi-format-strikethrough</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle v-model="toggleTextH" dense borderless>
        <v-btn
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <v-icon small>mdi-format-header-1</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <v-icon small>mdi-format-header-2</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <v-icon small>mdi-format-header-3</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          <v-icon small>mdi-format-header-4</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          <v-icon small>mdi-format-header-5</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          <v-icon small>mdi-format-header-6</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle v-model="toggleTextList" dense borderless>
        <v-btn
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <v-icon small>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <v-icon small>mdi-format-list-numbered</v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-btn
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <v-icon small>mdi-format-quote-close</v-icon>
      </v-btn>
      <v-btn @click="editor.chain().focus().setHorizontalRule().run()">
        <v-icon small>mdi-minus</v-icon>
      </v-btn>
      <v-btn @click="editor.chain().focus().setHardBreak().run()">
        <v-icon small>mdi-keyboard-return</v-icon>
      </v-btn>

      <v-btn @click="editor.chain().focus().undo().run()"
        ><v-icon small>mdi-undo</v-icon></v-btn
      >
      <v-btn @click="editor.chain().focus().redo().run()"
        ><v-icon small>mdi-redo</v-icon></v-btn
      >
    </v-item-group>
    <editor-content
      style="max-height: 75vh; overflow-y: scroll"
      :editor="editor"
    />
    <v-btn color="success" @click="save(false)">Speichern</v-btn>
    {{ error.message }}
  </v-card>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      toggleTextBtns: [],
      toggleTextH: [],
      toggleTextList: [],
      title: '',
      subtitle: '',
      image: null,
      btn: {
        text: 'speichern',
        loading: false,
      },
      error: {
        status: false,
        message: '',
      },
    }
  },

  computed: {
    userPublic() {
      return this.$store.state.modules.user.public
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: ``,
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },

  methods: {
    save(published) {
      this.btn.loading = true
      this.$fire.functions
        .httpsCallable('magazine-saveArticle')({
          isPublished: published,
          author: this.userPublic,
          title: this.title,
          subtitle: this.subtitle,
          image: this.image,
          text: this.editor.getJSON(),
        })
        .then(() => {
          this.btn.text = 'gespeichert'
          this.btn.loading = false
        })
        .catch((err) => {
          this.error.status = true
          this.error.message = err.message
        })
    },
  },
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
