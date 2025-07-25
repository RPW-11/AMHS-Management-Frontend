export const Routes = class {
    static Dashboard: string = "/dashboard"
    static Employees: string = "/employees"
    static ToolCase: string = "/tool-case"
    static Tasks: string = "/tasks"
    static Login: string = "/login"
    static NotFound: string = "/not-found"
}

export const EmployeeRoutes = class extends Routes {
    static Add: string = `${this.Employees}/add`
    static Profile = (employeeId: string): string => `${this.Employees}/profile/${employeeId}`
}
