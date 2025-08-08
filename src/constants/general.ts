export const Routes = class {
    static Dashboard: string = "/dashboard"
    static Employees: string = "/employees"
    static ToolCase: string = "/tool-case"
    static Missions: string = "/missions"
    static Login: string = "/login"
    static NotFound: string = "/not-found"
}

export const EmployeeRoutes = class extends Routes {
    static Add: string = `${this.Employees}/add`
    static Profile = (employeeId: string): string => `${this.Employees}/profile/${employeeId}`
}

export const MissionRoutes = class extends Routes {
    static Add: string = `${this.Missions}/add`
}

export const ToolCaseRoutes = class extends Routes {
    static RgvRoutePlanning: string = `${this.ToolCase}/rgv-route-planning`
}
