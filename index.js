document.addEventListener('alpine:init', () => {
    Alpine.store('usersStore', {
        users: [],
        user: {
            id: '',
            name: '',
            email: '',
            position: '',
            department: '',
        },
        errors: {
            name: false,
            email: false,
            position: false,
            department: false,
        },
        init() {
            this.resetUser();
        },
        validateUser() {
            this.errors.name = !this.user.name;
            this.errors.email = !this.user.email;
            this.errors.position = !this.user.position;
            this.errors.department = !this.user.department;

            return !this.errors.name && !this.errors.email && !this.errors.position && !this.errors.department;
        },
        saveUser() {
            if (this.validateUser()) {
                if (this.user.id) {
                    const updatedUser = { ...this.user };
                    this.users = this.users.map(user => (user.id === updatedUser.id ? updatedUser : user));
                } else {
                    // Add new user
                    this.user.id = Math.random().toString(36).substr(2, 9);
                    const newUser = { ...this.user };
                    this.users.push(newUser);
                }
                this.resetUser();
            }
        },
        deleteUser(id) {
            this.users = this.users.filter(user => user.id !== id);
        },
        editUser(user) {
            this.user = { ...user };
        },
        resetUser() {
            this.user = {
                id: '',
                name: '',
                email: '',
                position: '',
                department: ''
            };
            this.errors = {
                name: false,
                email: false,
                position: false,
                department: false,
            };
        }
    });
});
