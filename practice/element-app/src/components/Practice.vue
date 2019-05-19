<template> 
    <div>
        <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
        <p>{{ count }}</p>
        <p>{{ countAlias }}</p>
        <p>{{ countPlusLocalState }}</p>
        <p>{{ doneTodos }}</p>
        <p>{{ undoneTodos }}</p>
        <div>
            <button @click="increment">click here!</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data: function() {
        return {
            message: "Hello",
            localCount: 2,
        }
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('')
        },
        ...mapState({
            count: state => state.count,
            countAlias: 'count',
            countPlusLocalState (state) {
                return state.count + this.localCount
            }
        }),
        doneTodos () {
            return this.$store.getters.doneTodos
        },
        undoneTodos:function() {
            return this.$store.getters.getTodoById(2)
        }
    },
    methods: {
        ...mapMutations([
            'increment',
        ]),
        ...mapActions([
            'increment',
        ]),
    }

}
</script>

<style scoped lang="stylus" >
.el-row 
    margin-bottom 20px
    &:last-child 
        margin-bottom 0
    

.bg-purple {
    background: #d3dce6
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>

