new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isRunning: false,
        specialCount: 3,
        healCount: 2,
        turns: [],
        // damageToPlayer = 0,
        // damageToMonster = 0,
    },
    methods: {
        startGame: function() {
            this.isRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.healCount = 2
            this.specialCount = 3
            this.turns = []
        },
        giveUp: function() {
            this.isRunning = false
        },
        attack: function() {
            let damage = this.getDamage()
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage + ' damage'
            })

            if (this.hasWon()) { return }

            this.monsterAttack()
        },
        specialAttack: function() {
            this.specialCount -= 1
            let damage = this.specialAttackDamage()
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player critical hits monster for ' + damage + ' damage'
            })
            
            if (this.hasWon()) { return }

            this.monsterAttack()
        },
        monsterAttack: function() {
            let damage = this.getDamage()
            this.playerHealth -= damage
            this.hasWon()
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage + ' damage'
            })
        },
        heal: function() {
            this.healCount -= 1
            this.playerHealth += 15
            if (this.playerHealth > 100) {
                this.playerHealth = 100
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 15'
            })
            this.monsterAttack()
            this.hasWon()
            
        },
        getDamage: function() {
            return Math.floor(Math.random() * 10) + 1
        },
        specialAttackDamage: function() {
            let min = 5
            return Math.max(Math.floor(Math.random() * 10) + 5, min)
        },
        hasWon: function(health) {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame()
                } else {
                    this.isRunning = false
                }
                return true
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame()
                } else {
                    this.isRunning = false
                }
                return true
            } else {
                return false
            }
        }
    }
})