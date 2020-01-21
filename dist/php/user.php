<?php
/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-01-25 13:29:44
 * @LastEditTime: 2020-01-21 10:57:46
 * @LastEditors: 靳肖健
 */

// 连主库
include 'conn_sql.php';

// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 

$sql = "SELECT * FROM `2code_user` LIMIT 0, 30 ";
$result = $conn->query($sql);
 
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " user: " . $row["user"]. "<br>";
    }
} else {
    echo "0 结果";
}
$conn->close();
?>


