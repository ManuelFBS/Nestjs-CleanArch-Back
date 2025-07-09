export class UserSession {
        constructor(
                public id: number,
                public dni: string,
                public username: string,
                public role: string,
                public initDate: Date,
                public finalDate: Date,
                public initHour: string,
                public finalHour: string,
        ) {}
}
