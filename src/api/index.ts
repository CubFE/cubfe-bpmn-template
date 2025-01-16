export const listForm = (query: any) => {
    return {
        "total": 3,
        "rows": [
            {
                "formId": "1861950720111075330",
                "formName": "ceshi",
                "content": "{\"formRef\":\"elForm\",\"formModel\":\"formData\",\"size\":\"medium\",\"labelPosition\":\"right\",\"labelWidth\":100,\"formRules\":\"rules\",\"gutter\":15,\"disabled\":false,\"span\":24,\"formBtns\":true,\"fields\":[{\"__config__\":{\"label\":\"ceshi\",\"labelWidth\":null,\"showLabel\":true,\"changeTag\":true,\"tag\":\"el-input\",\"tagIcon\":\"input\",\"required\":true,\"layout\":\"colFormItem\",\"span\":24,\"document\":\"https://element.eleme.cn/#/zh-CN/component/input\",\"regList\":[],\"formId\":101,\"renderKey\":\"1011732758597016\"},\"__slot__\":{\"prepend\":\"\",\"append\":\"\"},\"placeholder\":\"请输入ceshi\",\"style\":{\"width\":\"100%\"},\"clearable\":true,\"prefix-icon\":\"\",\"suffix-icon\":\"\",\"maxlength\":null,\"show-word-limit\":false,\"readonly\":false,\"disabled\":false,\"__vModel__\":\"userName\"}]}",
                "remark": null
            },
            {
                "formId": "1864223578789212161",
                "formName": "节点表单",
                "content": "{\"formRef\":\"elForm\",\"formModel\":\"formData\",\"size\":\"medium\",\"labelPosition\":\"right\",\"labelWidth\":100,\"formRules\":\"rules\",\"gutter\":15,\"disabled\":false,\"span\":24,\"formBtns\":true,\"fields\":[{\"__config__\":{\"label\":\"单行文本\",\"labelWidth\":null,\"showLabel\":true,\"changeTag\":true,\"tag\":\"el-input\",\"tagIcon\":\"input\",\"required\":true,\"layout\":\"colFormItem\",\"span\":24,\"document\":\"https://element.eleme.cn/#/zh-CN/component/input\",\"regList\":[],\"formId\":101,\"renderKey\":\"1011733300492273\"},\"__slot__\":{\"prepend\":\"\",\"append\":\"\"},\"placeholder\":\"请输入单行文本单行文本\",\"style\":{\"width\":\"100%\"},\"clearable\":true,\"prefix-icon\":\"\",\"suffix-icon\":\"\",\"maxlength\":null,\"show-word-limit\":false,\"readonly\":false,\"disabled\":false,\"__vModel__\":\"field101\"}]}",
                "remark": "测试节点单独表单"
            },
            {
                "formId": "1871871399475458049",
                "formName": "测试属性",
                "content": "{\"formRef\":\"elForm\",\"formModel\":\"formData\",\"size\":\"medium\",\"labelPosition\":\"right\",\"labelWidth\":100,\"formRules\":\"rules\",\"gutter\":15,\"disabled\":false,\"span\":24,\"formBtns\":true,\"fields\":[{\"__config__\":{\"label\":\"下拉选择\",\"showLabel\":true,\"labelWidth\":null,\"tag\":\"el-select\",\"tagIcon\":\"select\",\"layout\":\"colFormItem\",\"span\":24,\"required\":true,\"regList\":[],\"changeTag\":true,\"document\":\"https://element.eleme.cn/#/zh-CN/component/select\",\"formId\":101,\"renderKey\":\"1011735123843149\"},\"__slot__\":{\"options\":[{\"label\":\"用户 A\",\"value\":1862787332525125600},{\"label\":\"用户 B\",\"value\":1862787391765475300}]},\"placeholder\":\"请选择下拉选择\",\"style\":{\"width\":\"100%\"},\"clearable\":true,\"disabled\":false,\"filterable\":false,\"multiple\":false,\"__vModel__\":\"selectUser\"}]}",
                "remark": null
            }
        ],
        "code": 200,
        "msg": "查询成功"
    }
}
export const listRole = (query: any) => {
    return {
        "total": 2,
        "rows": [
            {
                "createBy": null,
                "createTime": "2024-11-04 10:52:00",
                "updateBy": null,
                "updateTime": null,
                "roleId": 1,
                "roleName": "超级管理员",
                "roleKey": "admin",
                "roleSort": 1,
                "dataScope": "1",
                "menuCheckStrictly": true,
                "deptCheckStrictly": true,
                "status": "0",
                "delFlag": "0",
                "remark": "超级管理员",
                "flag": false,
                "menuIds": null,
                "deptIds": null,
                "admin": true
            },
            {
                "createBy": null,
                "createTime": "2024-11-04 10:52:00",
                "updateBy": null,
                "updateTime": null,
                "roleId": 2,
                "roleName": "普通角色",
                "roleKey": "common",
                "roleSort": 2,
                "dataScope": "2",
                "menuCheckStrictly": true,
                "deptCheckStrictly": true,
                "status": "0",
                "delFlag": "0",
                "remark": "普通角色",
                "flag": false,
                "menuIds": null,
                "deptIds": null,
                "admin": false
            }
        ],
        "code": 200,
        "msg": "查询成功"
    }
}

export const listUser = (query: any) => {
    return {
        "total": 5,
        "rows": [
            {
                "createBy": "admin",
                "createTime": "2024-11-04 10:51:59",
                "updateBy": null,
                "updateTime": null,
                "userId": 2,
                "deptId": 105,
                "userName": "ry",
                "nickName": "若依",
                "userType": null,
                "email": "crazyLionLi@qq.com",
                "phonenumber": "15666666666",
                "sex": "1",
                "avatar": "",
                "status": "0",
                "delFlag": "0",
                "loginIp": "127.0.0.1",
                "loginDate": "2024-11-28 09:53:53",
                "remark": "测试员",
                "dept": {
                    "createBy": null,
                    "createTime": null,
                    "updateBy": null,
                    "updateTime": null,
                    "parentName": null,
                    "parentId": null,
                    "children": [],
                    "deptId": 105,
                    "deptName": "测试部门",
                    "orderNum": null,
                    "leader": "若依",
                    "phone": null,
                    "email": null,
                    "status": null,
                    "delFlag": null,
                    "ancestors": null
                },
                "roles": [],
                "roleIds": null,
                "postIds": null,
                "roleId": null,
                "admin": false
            },
            {
                "createBy": "admin",
                "createTime": "2024-11-30 17:14:57",
                "updateBy": null,
                "updateTime": null,
                "userId": "1862787391765475329",
                "deptId": 100,
                "userName": "userb",
                "nickName": "userB",
                "userType": null,
                "email": "",
                "phonenumber": "",
                "sex": "0",
                "avatar": "",
                "status": "0",
                "delFlag": "0",
                "loginIp": "127.0.0.1",
                "loginDate": "2024-11-30 17:18:58",
                "remark": null,
                "dept": {
                    "createBy": null,
                    "createTime": null,
                    "updateBy": null,
                    "updateTime": null,
                    "parentName": null,
                    "parentId": null,
                    "children": [],
                    "deptId": 100,
                    "deptName": "若依科技",
                    "orderNum": null,
                    "leader": "若依",
                    "phone": null,
                    "email": null,
                    "status": null,
                    "delFlag": null,
                    "ancestors": null
                },
                "roles": [],
                "roleIds": null,
                "postIds": null,
                "roleId": null,
                "admin": false
            },
            {
                "createBy": "admin",
                "createTime": "2024-11-30 17:14:43",
                "updateBy": null,
                "updateTime": null,
                "userId": "1862787332525125633",
                "deptId": 100,
                "userName": "usera",
                "nickName": "用户 A",
                "userType": null,
                "email": "",
                "phonenumber": "",
                "sex": "0",
                "avatar": "",
                "status": "0",
                "delFlag": "0",
                "loginIp": "127.0.0.1",
                "loginDate": "2024-12-25 18:55:02",
                "remark": null,
                "dept": {
                    "createBy": null,
                    "createTime": null,
                    "updateBy": null,
                    "updateTime": null,
                    "parentName": null,
                    "parentId": null,
                    "children": [],
                    "deptId": 100,
                    "deptName": "若依科技",
                    "orderNum": null,
                    "leader": "若依",
                    "phone": null,
                    "email": null,
                    "status": null,
                    "delFlag": null,
                    "ancestors": null
                },
                "roles": [],
                "roleIds": null,
                "postIds": null,
                "roleId": null,
                "admin": false
            },
            {
                "createBy": "admin",
                "createTime": "2024-11-04 10:51:59",
                "updateBy": null,
                "updateTime": null,
                "userId": 1,
                "deptId": 103,
                "userName": "admin",
                "nickName": "若依管理员",
                "userType": null,
                "email": "crazyLionLi@163.com",
                "phonenumber": "15888888888",
                "sex": "1",
                "avatar": "",
                "status": "0",
                "delFlag": "0",
                "loginIp": "127.0.0.1",
                "loginDate": "2025-01-16 19:42:57",
                "remark": "管理员",
                "dept": {
                    "createBy": null,
                    "createTime": null,
                    "updateBy": null,
                    "updateTime": null,
                    "parentName": null,
                    "parentId": null,
                    "children": [],
                    "deptId": 103,
                    "deptName": "研发部门",
                    "orderNum": null,
                    "leader": "若依",
                    "phone": null,
                    "email": null,
                    "status": null,
                    "delFlag": null,
                    "ancestors": null
                },
                "roles": [],
                "roleIds": null,
                "postIds": null,
                "roleId": null,
                "admin": true
            },
            {
                "createBy": "admin",
                "createTime": "2024-11-30 17:15:12",
                "updateBy": null,
                "updateTime": null,
                "userId": "1862787452368973826",
                "deptId": 100,
                "userName": "userc",
                "nickName": "userC",
                "userType": null,
                "email": "",
                "phonenumber": "",
                "sex": "0",
                "avatar": "",
                "status": "0",
                "delFlag": "0",
                "loginIp": "127.0.0.1",
                "loginDate": "2024-12-04 16:24:52",
                "remark": null,
                "dept": {
                    "createBy": null,
                    "createTime": null,
                    "updateBy": null,
                    "updateTime": null,
                    "parentName": null,
                    "parentId": null,
                    "children": [],
                    "deptId": 100,
                    "deptName": "若依科技",
                    "orderNum": null,
                    "leader": "若依",
                    "phone": null,
                    "email": null,
                    "status": null,
                    "delFlag": null,
                    "ancestors": null
                },
                "roles": [],
                "roleIds": null,
                "postIds": null,
                "roleId": null,
                "admin": false
            }
        ],
        "code": 200,
        "msg": "查询成功"
    }
}

export const deptTreeSelect = () => {
    return {
        "code": 200,
        "msg": "操作成功",
        "data": [
            {
                "id": 100,
                "parentId": 0,
                "label": "若依科技",
                "weight": 0,
                "children": [
                    {
                        "id": 101,
                        "parentId": 100,
                        "label": "深圳总公司",
                        "weight": 1,
                        "children": [
                            {
                                "id": 103,
                                "parentId": 101,
                                "label": "研发部门",
                                "weight": 1
                            },
                            {
                                "id": 104,
                                "parentId": 101,
                                "label": "市场部门",
                                "weight": 2
                            },
                            {
                                "id": 105,
                                "parentId": 101,
                                "label": "测试部门",
                                "weight": 3
                            },
                            {
                                "id": 106,
                                "parentId": 101,
                                "label": "财务部门",
                                "weight": 4
                            },
                            {
                                "id": 107,
                                "parentId": 101,
                                "label": "运维部门",
                                "weight": 5
                            }
                        ]
                    },
                    {
                        "id": 102,
                        "parentId": 100,
                        "label": "长沙分公司",
                        "weight": 2,
                        "children": [
                            {
                                "id": 108,
                                "parentId": 102,
                                "label": "市场部门",
                                "weight": 1
                            },
                            {
                                "id": 109,
                                "parentId": 102,
                                "label": "财务部门",
                                "weight": 2
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

export const detpTree = () => {
    return {
        "code": 200,
        "msg": "操作成功",
        "data": [
            {
                "id": 100,
                "parentId": 0,
                "label": "若依科技",
                "weight": 0,
                "children": [
                    {
                        "id": 101,
                        "parentId": 100,
                        "label": "深圳总公司",
                        "weight": 1,
                        "children": [
                            {
                                "id": 103,
                                "parentId": 101,
                                "label": "研发部门",
                                "weight": 1
                            },
                            {
                                "id": 104,
                                "parentId": 101,
                                "label": "市场部门",
                                "weight": 2
                            },
                            {
                                "id": 105,
                                "parentId": 101,
                                "label": "测试部门",
                                "weight": 3
                            },
                            {
                                "id": 106,
                                "parentId": 101,
                                "label": "财务部门",
                                "weight": 4
                            },
                            {
                                "id": 107,
                                "parentId": 101,
                                "label": "运维部门",
                                "weight": 5
                            }
                        ]
                    },
                    {
                        "id": 102,
                        "parentId": 100,
                        "label": "长沙分公司",
                        "weight": 2,
                        "children": [
                            {
                                "id": 108,
                                "parentId": 102,
                                "label": "市场部门",
                                "weight": 1
                            },
                            {
                                "id": 109,
                                "parentId": 102,
                                "label": "财务部门",
                                "weight": 2
                            }
                        ]
                    }
                ]
            }
        ]
    }
}