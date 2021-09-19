class UserDto {
    id;
    phone;
    name;
    avatar;
    email;
    activated;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.phone = user.phone;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.address = user.address;
        this.avatar = user.avatar
            ? `${process.env.BASE_URL}${user.avatar}`
            : null;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto;
