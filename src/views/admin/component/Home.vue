<script setup>
const tableData = [
    /* <el-table-column labal="订单笔数" prop="orderNumber" width="180" />
                <el-table-column labal="订单付款数" prop="orderPaidNumber" />
                <el-table-column labal="总订单金额" prop="orderAmount" />
                <el-table-column labal="订单付款金额(元)" prop="orderPaidAmount" />
                <el-table-column labal="订单用户数" prop="orderUserNumber" /> */
    {
        date: '昨天',
        orderNumber: 0,
        orderPaidNumber: 0,
        orderAmount: 0,
        orderPaidAmount: 0,
        orderUserNumber: 0
    },
    {
        date: '近七天',
        orderNumber: 0,
        orderPaidNumber: 0,
        orderAmount: 0,
        orderPaidAmount: 0,
        orderUserNumber: 0
    },
    {
        date: '近三十天',
        orderNumber: 0,
        orderPaidNumber: 0,
        orderAmount: 0,
        orderPaidAmount: 0,
        orderUserNumber: 0
    },
]
</script>
<template>
    <div>
        <el-descriptions title="管理员信息" direction="vertical" border style="margin-top: 20px">
            <el-descriptions-item :rowspan="2" :width="140" label="Photo" align="center">
                <el-image style="width: 100px; height: 100px"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-descriptions-item>
            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
            <el-descriptions-item label="电话">18100000000</el-descriptions-item>
            <el-descriptions-item label="地址">Suzhou</el-descriptions-item>
            <el-descriptions-item label="上次登陆时间">
            </el-descriptions-item>
            <!-- <el-descriptions-item label="Address">
                No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
            </el-descriptions-item> -->
        </el-descriptions>
        <el-descriptions title="订单交易" direction="vertical" border style="margin-top: 20px">
            <el-descriptions-item label="待确认">0</el-descriptions-item>
            <el-descriptions-item label="待付款">0</el-descriptions-item>
            <el-descriptions-item label="待发货">0</el-descriptions-item>
            <el-descriptions-item label="待确认收货">0</el-descriptions-item>
            <el-descriptions-item label="退款/退货">0</el-descriptions-item>
            <el-descriptions-item label="待评价">0</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="订单数据统计" style="margin-top: 20px">
        </el-descriptions>
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="orderNumber" label="订单笔数" />
            <el-table-column prop="orderPaidNumber" label="订单付款数" />
            <el-table-column prop="orderAmount" label="总订单金额" />
            <el-table-column prop="orderPaidAmount" label="订单付款金额(元)" />
            <el-table-column prop="orderUserNumber" label="订单用户数" />
        </el-table>
    </div>
</template>
<style></style>